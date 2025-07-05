import { FaTelegramPlane, FaArrowLeft } from "react-icons/fa";
import { useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { useFirestore } from "../hooks/useFirestore";
import useGlobalContext from "../hooks/useGlobalContext";
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

function Chat() {
  const { user } = useGlobalContext();
  const [allUsers, setAllUsers] = useState([]);
  const [chatData, setChatData] = useState({ list: null, activeChat: null });
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [openSidebar, setOpenSidebar] = useState(false);
  const [submitTime, setSubmitTime] = useState(false);

  const isMobile = window.innerWidth < 640; // sm dan kichikmi

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
        setChatData((prev) => ({ ...prev, list: sortedChats }));
      } else {
        setChatData({ ...chatData, list: [] });
      }
    });

    return () => unsubscribe();
  }, [user?.uid]);

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

    const combinedId =
      user.uid > selectedUser.id
        ? user.uid + selectedUser.id
        : selectedUser.id + user.uid;

    const chatRef = doc(db, "chats", combinedId);
    const chatSnap = await getDoc(chatRef);

    if (!chatSnap.exists()) {
      await setDoc(chatRef, { messages: [] });

      const defaultMessage = "Say hi 👋";

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

  return (
    <div className="h-[93vh] flex flex-col bg-base-100">
      <div className="chat-container h-full w-full flex">
        {/* Sidebar */}
        <div
          className={`chat-list h-full border-r border-base-200 ${
            openSidebar ? "hidden" : "block"
          } sm:block sm:w-72 md:w-80 lg:w-96 w-full relative`}
        >
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
          {chatData?.list?.map((item) => (
            <div
              key={item.chatId}
              onClick={() => {
                handleUserSelect({ ...item.userInfo, id: item.userInfo.uid });
                if (isMobile) setOpenSidebar(true); // faqat mobilda
              }}
              className="p-3 hover:bg-base-200 cursor-pointer"
            >
              <div className="flex gap-3 items-center">
                <img
                  src={item.userInfo.photoURL}
                  alt=""
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h4 className="font-semibold">{item.userInfo.displayName}</h4>
                  <p className="text-sm opacity-60">
                    {item.lastMessage || "Say hi 👋"}
                  </p>
                </div>
              </div>
            </div>
          ))}
          {chatData?.list?.length > 0 && (
            <div className="absolute bottom-4 text-center w-full">
              <button
                className="btn btn-sm"
                onClick={() =>
                  document.getElementById("chat_list_modal").showModal()
                }
              >
                New chat
              </button>
            </div>
          )}
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
            <h2 className="font-semibold">
              {chatData?.activeChat?.userInfo?.displayName}
            </h2>
          </header>

          {/* Messages */}
          <div className="px-4 py-2 overflow-y-auto h-[calc(100%-120px)]">
            {messages.length === 0 ? (
              <p className="text-center opacity-60 mt-10">
                Start the conversation
              </p>
            ) : (
              messages.map((msg, idx) => {
                const isCurrentUser = msg.senderId === user.uid;
                return (
                  <div
                    key={idx}
                    className={`mb-2 flex ${
                      isCurrentUser ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`px-4 py-2 rounded-lg max-w-[70%] break-words ${
                        isCurrentUser
                          ? "bg-blue-500 text-white rounded-br-none"
                          : "bg-gray-200 text-gray-800 rounded-bl-none"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Input */}
          <div className="absolute bottom-4 sm:bottom-0 w-full bg-base-100 p-4">
            {chatData?.activeChat && (
              <form className="flex gap-2" onSubmit={handleSendMessage}>
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 border outline-none rounded-full px-4 py-2"
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
        <div className="modal-box max-w-sm">
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
            <button className="btn">Close</button>
          </form>
        </div>
      </dialog>
    </div>
  );
}

export default Chat;
