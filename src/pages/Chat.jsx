import { FaTelegramPlane, FaArrowLeft, FaTrash } from "react-icons/fa";
import { useEffect, useState, useRef } from "react";

import useGlobalContext from "../hooks/useGlobalContext";
import { db } from "../firebase/firebaseConfig";
import { IoChatboxEllipses } from "react-icons/io5";
import { deleteField } from "firebase/firestore";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  onSnapshot,
  serverTimestamp,
  collection,
  runTransaction,
} from "firebase/firestore";
import { auth } from "../firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import {
  ref,
  onDisconnect,
  set,
  onValue,
  getDatabase,
} from "firebase/database";
//main function
function Chat() {
  const { user, isDark } = useGlobalContext();
  const [allUsers, setAllUsers] = useState([]);
  const [chatData, setChatData] = useState({ list: null, activeChat: null });
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [openSidebar, setOpenSidebar] = useState(false);
  const [submitTime, setSubmitTime] = useState(false);
  const [userStatuses, setUserStatuses] = useState({});
  const [selectedUserStatus, setSelectedUserStatus] = useState("");
  const [deletingChat, setDeletingChat] = useState(null);
  const [chatDeleteLoader, setChatDeleteLoader] = useState(false);
  const messageEndRef = useRef();
  const isMobile = window.innerWidth < 640; // sm dan kichikmi
  const dbase = getDatabase();
  //userning online rejimini ko'rish
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const userStatusRef = ref(dbase, `/status/${user.uid}`);

      //online holatini bildiruvchi object
      const isOnlineForDatabase = {
        state: "online",
        last_changed: serverTimestamp(),
      };

      //offline xolati
      const isOfflineForDatabase = {
        state: "offline",
        last_changed: serverTimestamp(),
      };

      //Browser ulanmagan payt
      onDisconnect(userStatusRef)
        .set(isOfflineForDatabase)
        .then(() => {
          //foydalanuvchi ulanib turgan xolatini online deb yozish
          set(userStatusRef, isOnlineForDatabase);
        });
    }
  });

  useEffect(() => {
    if (!chatData.length) return;

    const statusRefs = chatData.map((user) => {
      const userStatusRef = ref(dbase, `/status/${user.uid}`);
      return onValue(userStatusRef, (snapshot) => {
        const data = snapshot.val();
        setUserStatuses((prev) => ({
          ...prev,
          [user.uid]: data?.state || "offline",
        }));
      });
    });

    // cleanup — komponent unmount bo‘lganda listenerlarni olib tashlaydi
    return () => statusRefs.forEach((unsub) => unsub());
  }, [chatData]);

  useEffect(() => {
    if (!user?.uid) return;

    const userChatsRef = doc(db, "userChats", user.uid);
    const unsubscribe = onSnapshot(userChatsRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();

        const sortedChats = Object.entries(data)
          .sort((a, b) => b[1].date?.seconds - a[1].date?.seconds)
          .map(([chatId, info]) => ({
            chatId,
            ...info,
          }));

        // ✅ Chat ro‘yxatini yangilaymiz
        setChatData((prev) => ({ ...prev, list: sortedChats }));

        // ✅ Agar activeChat o‘chirilgan bo‘lsa — uni tozalaymiz
        const activeChatStillExists = sortedChats.some(
          (chat) => chat.chatId === chatData?.activeChat?.chatId
        );

        if (!activeChatStillExists && chatData?.activeChat) {
          setChatData((prev) => ({ ...prev, activeChat: null }));
        }
      } else {
        // Hamma chatlar o‘chirilgan bo‘lsa
        setChatData((prev) => ({ ...prev, list: [], activeChat: null }));
      }
    });

    return () => unsubscribe();
  }, [user?.uid, chatData?.activeChat?.chatId]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "Users"), (snap) => {
      const users = [];
      snap.forEach((doc) => {
        if (doc.id !== user.uid) {
          users.push({ id: doc.id, ...doc.data() });
        }
      });
      setAllUsers(users);
    });
    return () => unsubscribe();
  }, [user?.uid]);

  const handleUserSelect = async (selectedUser) => {
    if (!user?.uid || !selectedUser?.id) return;
    setSelectedUserStatus(
      selectedUser.status === "online" ? "Online" : "Offline"
    );

    const combinedId =
      user.uid > selectedUser.id
        ? user.uid + selectedUser.id
        : selectedUser.id + user.uid;

    const chatRef = doc(db, "chats", combinedId);
    const chatSnap = await getDoc(chatRef);

    if (!chatSnap.exists()) {
      await setDoc(chatRef, { messages: [] });

      const defaultMessage = "";

      const senderRef = doc(db, "userChats", user.uid);
      const receiverRef = doc(db, "userChats", selectedUser.id);

      const senderData = {
        userInfo: {
          uid: selectedUser.id,
          displayName: selectedUser.displayName,
          photoURL: selectedUser.photoURL,
        },
        date: serverTimestamp(),
        lastMessage: defaultMessage,
      };

      const receiverData = {
        userInfo: {
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL,
        },
        date: serverTimestamp(),
        lastMessage: defaultMessage,
      };

      await setDoc(senderRef, { [combinedId]: senderData }, { merge: true });
      await setDoc(
        receiverRef,
        { [combinedId]: receiverData },
        { merge: true }
      );
    }

    setChatData((prev) => ({
      ...prev,
      activeChat: {
        chatId: combinedId,
        userInfo: selectedUser,
      },
    }));

    if (isMobile) setOpenSidebar(true); // Mobilda chatga o'tish

    document.getElementById("chat_list_modal").close();
  };

  useEffect(() => {
    const chatId = chatData?.activeChat?.chatId;
    if (!chatId) return;

    const unsub = onSnapshot(doc(db, "chats", chatId), (snap) => {
      if (snap.exists()) {
        setMessages(snap.data().messages || []);
      }
    });

    return () => unsub();
  }, [chatData?.activeChat?.chatId]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    const text = messageText.trim();

    // Avval matn va activeChat tekshirilsin
    if (!text || !chatData.activeChat) {
      setSubmitTime(false); // <-- MUHIM: bu joyni qo‘shing
      return;
    }

    setSubmitTime(true); // <-- bu endi to'g'ri joyda turadi

    const chatId = chatData.activeChat.chatId;
    const chatRef = doc(db, "chats", chatId);

    const newMessage = {
      senderId: user.uid,
      text,
      timestamp: new Date(),
    };

    try {
      await runTransaction(db, async (transaction) => {
        const chatDoc = await transaction.get(chatRef);
        const currentMessages = chatDoc.data()?.messages || [];
        transaction.update(chatRef, {
          messages: [...currentMessages, newMessage],
        });
      });

      const user1Ref = doc(db, "userChats", user.uid);
      const user2Ref = doc(db, "userChats", chatData.activeChat.userInfo.uid);
      const update = {
        [`${chatId}.lastMessage`]: text,
        [`${chatId}.date`]: serverTimestamp(),
      };

      await updateDoc(user1Ref, update);
      await updateDoc(user2Ref, update);

      setMessageText("");
    } catch (err) {
      console.error("Message sending error:", err);
    } finally {
      // Har qanday holatda submitTime ni false ga qaytaramiz
      setSubmitTime(false);
    }
  };

  const shortenText = (text, maxLength) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  // yozishmalar chatini delete qilish
  const deleteUserChat = async () => {
    setChatDeleteLoader(true);
    const chatId = deletingChat.chatId;
    const userRef = doc(db, "userChats", user.uid);

    try {
      await updateDoc(userRef, {
        [chatId]: deleteField(), // <-- Firebase'dan o‘chirish
      });
    } catch (err) {
      console.error("Chat o‘chirishda xatolik:", err);
    }

    setChatDeleteLoader(false);
    document.getElementById("delete-chat").close();
  };
  return (
    <div className="h-[93vh] flex flex-col bg-base-100">
      <div className="chat-container h-full w-full flex">
        {/* Sidebar */}

        {/* ================= Left side chat list ============================================== */}
        <div
          className={`chat-list h-full border-r border-base-200 ${
            openSidebar ? "hidden" : "block"
          } sm:block sm:w-72 md:w-80 lg:w-96 w-full relative`}
        >
          {chatData?.list?.length > 0 && (
            <div className="search-section p-4 flex gap-2">
              <input
                type="search"
                className="input input-bordered w-full rounded-full input-sm h-10 bg-base-200/70 ps-4 border-none"
                placeholder="Search"
              />
              <button
                className=""
                onClick={() =>
                  document.getElementById("chat_list_modal").showModal()
                }
              >
                <IoChatboxEllipses className="w-6 h-6 text-base-content/70" />
              </button>
            </div>
          )}
          {!chatData?.list && (
            <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          )}
          {chatData?.list?.length === 0 && (
            <div className="mt-14 text-center">
              <h3 className="text-lg opacity-70">You have no chats yet!</h3>
              <button
                onClick={() =>
                  document.getElementById("chat_list_modal").showModal()
                }
                className="btn btn-primary btn-sm mt-4"
              >
                New chats
              </button>
            </div>
          )}
          <div className="overflow-y-auto h-[91%]">
            {chatData?.list?.map((item) => {
              const status = userStatuses[item.uid];
              const activeElement =
                item.uid === chatData?.activeChat?.userInfo.id;
              const date = item?.date?.seconds
                ? new Date(item.date.seconds * 1000)
                : null;

              return (
                <div
                  key={item.chatId}
                  onClick={() => {
                    handleUserSelect({
                      ...item.userInfo,
                      id: item.userInfo.uid,
                      status,
                    });
                    if (isMobile) setOpenSidebar(true); // faqat mobilda
                  }}
                  className={`ps-3 py-3  pe-1   hover:bg-base-200  cursor-pointer flex justify-between group`}
                >
                  <div className="flex  gap-3 items-center justify-between  w-full">
                    <div className="flex group gap-3 items-center relative">
                      <div className="relative">
                        <img
                          src={item.userInfo.photoURL}
                          alt=""
                          className="w-10 h-10 rounded-full"
                        />
                        <span
                          className={`absolute w-3 h-3 bottom-0 right-0 ${
                            selectedUserStatus === "online"
                              ? "bg-green-500"
                              : "bg-gray-400"
                          } rounded-full border-2 border-white`}
                        ></span>
                      </div>
                      <div>
                        <h4 className="font-semibold">
                          {item.userInfo.displayName}
                        </h4>
                        <p className="text-sm opacity-60 ">
                          {shortenText(item.lastMessage, 30) ||
                            "No message yet"}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col justify-between items-end h-full">
                      <div>
                        <button
                          disabled={chatDeleteLoader}
                          onClick={(e) => {
                            e.stopPropagation();
                            document.getElementById("delete-chat").showModal();
                            setDeletingChat(item);
                          }}
                          className="hidden group-hover:block"
                        >
                          <FaTrash className="w-3 h-3 text-red-500 " />
                        </button>
                      </div>
                      {item?.date?.seconds && (
                        <span className="text-sm text-gray-400 ">
                          {date.getHours().toString().padStart(2, "0")}:
                          {date.getMinutes().toString().padStart(2, "0")}
                        </span>
                      )}
                    </div>
                  </div>
                  {/* <button
                  onClick={() => deleteUserChat(item)}
                  className="opacity-0 group-hover:opacity-100"
                >
                  <IoTrashOutline className="text-base-content w-5 h-5" />
                </button> */}
                </div>
              );
            })}
          </div>
        </div>

        {/* Chat section */}
        <div
          className={`flex-1 relative h-full ${
            openSidebar ? "block" : "hidden"
          } sm:block`}
        >
          <header className="h-16 shadow bg-base-100 flex items-center px-4 gap-3">
            <button className="sm:hidden" onClick={() => setOpenSidebar(false)}>
              <FaArrowLeft />
            </button>
            <div className="ml-10">
              <h2 className="font-semibold">
                {chatData?.activeChat?.userInfo?.displayName}
                {/* <UserStatus userId={}/> */}
              </h2>
              {chatData?.activeChat && (
                <p
                  className={`text-xs text-center ${
                    selectedUserStatus === "online"
                      ? "text-green-500"
                      : "text-gray-400"
                  }`}
                >
                  {selectedUserStatus}
                </p>
              )}
            </div>
          </header>

          {/* Messages */}
          <div
            className={`px-4 py-2 overflow-y-auto ${
              !isDark ? "bg-base-200" : "bg-[#effafd]"
            } h-[calc(100%-120px)] relative`}
          >
            {messages.length === 0 ? (
              <p className="text-center opacity-60 mt-10">
                Start the conversation
              </p>
            ) : (
              messages.map((msg, idx) => {
                const newDate = new Date(
                  msg.timestamp.seconds * 1000 +
                    msg.timestamp.nanoseconds / 1_000_000
                );
                const hour = newDate.getHours();
                const minute = newDate.getMinutes();
                const day = newDate.getDay();

                const isCurrentUser = msg.senderId === user.uid;
                return (
                  <div
                    key={idx}
                    className={`mb-2 flex pb-6 ${
                      isCurrentUser ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`px-4 py-2 rounded-2xl min-w-[150px] max-w-[80%] break-words relative ${
                        isCurrentUser
                          ? ` ${
                              isDark ? "bg-[#6fb8fd]" : "bg-[#1f2029]"
                            } text-white rounded-br-none`
                          : "bg-base-100 text-base-content/80 rounded-bl-none"
                      }`}
                    >
                      {msg.text}
                      <p className=" bottom-2 right-2 flex justify-end text-xs opacity-50">
                        {hour}:{minute}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
            <div ref={messageEndRef}></div>
          </div>

          {/* Input */}
          <div className="absolute bottom-4 sm:bottom-0 w-full bg-base-100 p-4">
            {chatData?.activeChat && (
              <form className="flex gap-2" onSubmit={handleSendMessage}>
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 border outline-none rounded-full px-4 py-2 max-h-28 bg-transparent border-base-content/20"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                />
                <button
                  type="submit"
                  className={`${
                    submitTime ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={submitTime}
                >
                  <FaTelegramPlane className="text-sky-600 w-7 h-7" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Modal for selecting users */}
      <dialog id="chat_list_modal" className="modal">
        <div className="modal-box max-w-sm relative">
          <h3 className="text-lg font-bold mb-4">Select user</h3>
          <div className="flex flex-col gap-2">
            {allUsers.map((user) => (
              <div
                key={user.id}
                onClick={() => handleUserSelect(user)}
                className="flex items-center gap-3 p-2 cursor-pointer hover:bg-base-200"
              >
                <img
                  src={user.photoURL}
                  className="w-10 h-10 rounded-full"
                  alt=""
                />
                <div>
                  <h4 className="font-semibold">{user.displayName}</h4>
                </div>
              </div>
            ))}
          </div>
          <form method="dialog" className="modal-action">
            <button className="btn btn-ghost absolute top-1 right-1">
              Close
            </button>
          </form>
        </div>
      </dialog>

      <dialog id="delete-chat" className="modal">
        <div className="modal-box max-w-sm relative">
          <h3 className="text-2xl text-center font-bold mb-4">
            Do you want to delete this chat?
          </h3>

          <form method="dialog" className="modal-action flex justify-center">
            <button className="btn btn-sm bg-blue-500 hover:bg-blue-600 text-white ">
              Close
            </button>
            <button
              onClick={() => deleteUserChat()}
              className="btn btn-sm bg-red-500 hover:bg-red-600 text-white"
            >
              Delete
            </button>
          </form>
        </div>
      </dialog>
    </div>
  );
}

export default Chat;
