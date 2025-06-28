//icons
import { FaTelegramPlane } from "react-icons/fa";

function Chat() {
  return (
    <div className="h-[93vh] flex flex-col bg-base-100">
      {/* Header */}
      <header className="h-16 bg-white shadow"> ... </header>

      <div className="chat-container h-full w-full border flex">
        {/* ================ chatning chap tomondagi ro'yxati =================== */}
        <div className="chat-list w-0 sm:w-72 md:w-80 lg:w-96 h-full border-r "></div>
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
    </div>
  );
}

export default Chat;
