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
import { Link } from "react-router-dom";

import { useState } from "react";

//components
import LogoutModal from "./LogoutModal";

function Sidebar() {
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);
  const toggleSidebar = () => {
    setIsOpenSidebar((prev) => {
      return prev ? false : true;
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
              <Link>
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
              <Link>
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
              <Link>
                <BsChatSquareDots className="icons" />
                <span
                  className={`transition-all duration-200 font-semibold text-[16px] ${
                    isOpenSidebar ? "opacity-100 ml-2" : "opacity-0 w-0 ml-0"
                  } whitespace-nowrap`}
                >
                  Chat
                </span>
              </Link>
            </li>
            <li>
              <Link>
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
              <Link>
                <TbSettings className="icons" />
                <span
                  className={`transition-all duration-200 font-semibold text-[16px] ${
                    isOpenSidebar ? "opacity-100 ml-2" : "opacity-0 w-0 ml-0"
                  } whitespace-nowrap`}
                >
                  Settings
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
    </div>
  );
}

export default Sidebar;
