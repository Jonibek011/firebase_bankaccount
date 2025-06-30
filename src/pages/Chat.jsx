//icons
import { FaTelegramPlane } from "react-icons/fa";
import { useFirestore } from "../hooks/useFirestore";
import useGlobalContext from "../hooks/useGlobalContext";
import { useEffect, useState } from "react";
import { doc, onSnapshot, collection } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
function Chat() {
  const { getUserChats } = useFirestore();
  const { user } = useGlobalContext();
  const [allUsers, setAllUsers] = useState([]);
  const [chatPending, setChatPending] = useState(false);
  const [chatData, setChatData] = useState(null);
  useEffect(() => {
    const fetchChats = async () => {
      const chats = await getUserChats(user.uid);
      setChatData(chats);
    };
    fetchChats();
  }, []);

  useEffect(() => {
    const usersRef = collection(db, "Users");
    const unsubscribe = onSnapshot(usersRef, (snapshot) => {
      const result = [];
      snapshot.forEach((doc) => {
        if (doc.id !== user.uid) {
          result.push({ id: doc.id, ...doc.data() });
        }
      });
      setAllUsers(result);
    });

    return () => unsubscribe();
  }, [user.uid]);

  return (
    <div className="h-[93vh] flex flex-col bg-base-100">
      {/* Header */}
      <header className="h-16 bg-white shadow"> ... </header>

      <div className="chat-container h-full w-full border flex">
        {/* ================ chatning chap tomondagi ro'yxati =================== */}
        <div className="chat-list w-0 sm:w-72 md:w-80 lg:w-96 h-full border-r p-3 ">
          {chatData?.length === 0 && (
            <div className="mt-14 flex flex-col gap-4 ">
              <h3 className="font-medium text-lg opacity-70 text-center">
                You have not any chats yet !
              </h3>
              <button
                onClick={() =>
                  document.getElementById("chat_list_modal").showModal()
                }
                className="btn btn-primary btn-sm max-w-28 mx-auto"
              >
                New chats
              </button>
            </div>
          )}
        </div>
        {/* ================== Chatning yozishmalar qismi ============================================ */}
        <div className="flex-1 h-full relative">
          {/* Messages qismi - scroll bo'ladi */}
          <div className="w-full overflow-y-auto px-4 py-2 ">
            {/* Map messages here */}
            <h1>salom</h1>
          </div>
          {/* Input qismi */}
          <div className=" px-6 py-2 bg-white  absolute bottom-0  w-full">
            <form className="flex gap-2">
              <label className="flex w-full border rounded-full  px-3">
                <input
                  type="text"
                  className="flex-1 border-none outline-none rounded-full px-3 py-2"
                  placeholder="Type a message..."
                />
                <button className=" px-2 py-2 ">
                  <FaTelegramPlane className="w-8 h-8 text-sky-700" />
                </button>
              </label>
            </form>
          </div>
        </div>
      </div>

      {/* =========================== Modal ================================== */}

      <dialog id="chat_list_modal" className="modal">
        <div className="modal-box max-w-sm max-h-[70vh] awetflow-y-auto p-0">
          <h3 className="font-bold text-lg my-5 px-4">Select users!</h3>
          <div className="flex flex-col gap-2">
            {allUsers &&
              allUsers.map((contact) => {
                return (
                  <div
                    key={contact.id}
                    className="hover:bg-base-200 transition-all duration-150 px-4 py-1"
                  >
                    <div className="flex gap-3 items-center">
                      <img
                        src={contact.photoURL}
                        className="w-10 h-10 rounded-full "
                        alt=""
                      />
                      <div>
                        <h4 className="font-semibold">{contact.displayName}</h4>
                        <p className="text-blue-500 text-sm">online</p>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default Chat;
