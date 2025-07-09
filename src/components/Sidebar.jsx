//react-iconst
import { MdDashboardCustomize } from "react-icons/md";
import { TbSubtask } from "react-icons/tb";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { BsChatSquareDots } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { TbSettings } from "react-icons/tb";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

//react-router-dom
import { Link, Navigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useState } from "react";
import useGlobalContext from "../hooks/useGlobalContext";
//components
import LogoutModal from "./LogoutModal";

//navigate
import { useNavigate } from "react-router-dom";
//auth
import { auth } from "../firebase/firebaseConfig.js";

import { sendEmailVerification } from "firebase/auth";
function Sidebar() {
  const navigate = useNavigate();
  const { user } = useGlobalContext();
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);
  const toggleSidebar = () => {
    setIsOpenSidebar((prev) => {
      return prev ? false : true;
    });
  };

  const checkUserVerify = () => {
    if (user.emailVerified) {
      navigate("/chat"); // ✅ To'g'ri usul
    } else {
      document.getElementById("sidebar_modal").showModal();
    }
  };

  const sendVerification = () => {
    sendEmailVerification(auth.currentUser).then(() => {
      toast.success("Verification has been sent, check your email!");
      document.getElementById("sidebar_modal").close();
    });
  };
  return (
    <div
      style={{ width: isOpenSidebar ? "200px" : "75px" }}
      className=" border-r py-10 hidden md:flex flex-col transition-all duration-300 h-full flex-shrink-0 overflow-y-auto overflow-hidden"
    >
      <Link to="/">
        <div className="logo h-10 flex ml-4 cursor-pointer">
          <img
            src={isOpenSidebar ? "./Logo.png" : "./secondLogo.png"}
            className=" h-full block"
            alt=""
          />
        </div>
      </Link>
      <div className="flex flex-col  gap-10">
        <div className="menu flex gap-5 justify-center ">
          <ul className="flex flex-col  gap-7 ">
            <li>
              <Link to="dashboard">
                <MdDashboardCustomize className="icons" />

                <span
                  className={`transition-all duration-200 font-semibold text-[16px] ${
                    isOpenSidebar ? "opacity-100 ml-2" : "opacity-0 w-0 ml-0"
                  } whitespace-nowrap`}
                >
                  Dashboard
                </span>
              </Link>
            </li>
            <li>
              <Link to="tasks">
                <TbSubtask className="icons" />
                <span
                  className={`transition-all duration-200 font-semibold text-[16px] ${
                    isOpenSidebar ? "opacity-100 ml-2" : "opacity-0 w-0 ml-0"
                  } whitespace-nowrap`}
                >
                  Tasks
                </span>
              </Link>
            </li>
            <li>
              <Link to="/expense">
                <RiMoneyDollarCircleLine className="icons" />
                <span
                  className={`transition-all duration-200 font-semibold text-[16px] ${
                    isOpenSidebar ? "opacity-100 ml-2" : "opacity-0 w-0 ml-0"
                  } whitespace-nowrap`}
                >
                  Expense Tracker
                </span>
              </Link>
            </li>
            <li>
              <div onClick={checkUserVerify}>
                <BsChatSquareDots className="icons" />
                <span
                  className={`transition-all duration-200 font-semibold text-[16px] ${
                    isOpenSidebar ? "opacity-100 ml-2" : "opacity-0 w-0 ml-0"
                  } whitespace-nowrap`}
                >
                  Chat
                </span>
              </div>
            </li>
            <li>
              <Link to="/profile">
                <CgProfile className="icons" />
                <span
                  className={`transition-all duration-200 font-semibold text-[16px] ${
                    isOpenSidebar ? "opacity-100 ml-2" : "opacity-0 w-0 ml-0"
                  } whitespace-nowrap`}
                >
                  Profile
                </span>
              </Link>
            </li>

            <li>
              <button
                onClick={() =>
                  document.getElementById("my_modal_1").showModal()
                }
              >
                <RiLogoutCircleRLine className="icons" />
                <span
                  className={`transition-all duration-200 font-semibold text-[16px] ${
                    isOpenSidebar ? "opacity-100 ml-2" : "opacity-0 w-0 ml-0"
                  } whitespace-nowrap`}
                >
                  Logout
                </span>
              </button>
            </li>
            <button
              onClick={toggleSidebar}
              className="btn btn-ghost btn-sm self-start"
            >
              {isOpenSidebar ? (
                <IoIosArrowBack className="w-7 h-7" />
              ) : (
                <IoIosArrowForward className="w-7 h-7" />
              )}
            </button>
          </ul>
        </div>
        <hr className=" w-full" />
      </div>
      <LogoutModal />
      <dialog id="sidebar_modal" className="modal">
        <div className="modal-box w-[80vw] mx-auto sm:max-w-sm md:max-w-md">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">
            If you want to enter chat section please verify your email first !
          </p>
          <div className="modal-action">
            <form method="dialog" className="flex justify-end gap-4 ">
              {/* if there is a button in form, it will close the modal */}
              <button
                onClick={sendVerification}
                type="button"
                className="btn btn-primary btn-sm"
              >
                Verify
              </button>
              <button className="btn btn-sm">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default Sidebar;
