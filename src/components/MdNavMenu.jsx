import { Link } from "react-router-dom";

//react-iconst
import { MdDashboardCustomize } from "react-icons/md";
import { TbSubtask } from "react-icons/tb";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { BsChatSquareDots } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { TbSettings } from "react-icons/tb";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { HiMiniXMark } from "react-icons/hi2";
import { IoHome } from "react-icons/io5";
//component
// import LogoutModal from "../components/LogoutModal";
import { useLogout } from "../hooks/useLogout";
function MdNavMenu({ toggleBtn, setToggleBtn }) {
  const { signOutUser } = useLogout();

  const logoutButton = () => {
    signOutUser();
    setToggleBtn(false);
  };
  return (
    <div
      style={{ left: toggleBtn ? "0px" : "-100%" }}
      className="absolute z-50 py-10  top-16 transition-all duration-200 w-[40vw] h-full bg-transparent backdrop-blur-3xl border flex flex-col items-center"
    >
      <div className="navMenu flex items-center">
        <ul className="flex flex-col  gap-7 ">
          <li>
            <Link
              onClick={() => setToggleBtn(false)}
              to="/"
              className="nav-link"
            >
              <IoHome className="sm-icons" />

              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link
              to="dashboard"
              onClick={() => setToggleBtn(false)}
              className="nav-link"
            >
              <MdDashboardCustomize className="sm-icons" />

              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              to="tasks"
              onClick={() => setToggleBtn(false)}
              className="nav-link"
            >
              <TbSubtask className="sm-icons" />
              <span>Tasks</span>
            </Link>
          </li>
          <li>
            <Link
              to="/expense"
              onClick={() => setToggleBtn(false)}
              className="nav-link"
            >
              <RiMoneyDollarCircleLine className="sm-icons" />
              <span>Expense Tracker</span>
            </Link>
          </li>
          <li>
            <Link onClick={() => setToggleBtn(false)} className="nav-link">
              <BsChatSquareDots className="sm-icons" />
              <span>Chat</span>
            </Link>
          </li>
          <li>
            <Link onClick={() => setToggleBtn(false)} className="nav-link">
              <CgProfile className="sm-icons" />
              <span>Profile</span>
            </Link>
          </li>
          <li>
            <Link onClick={() => setToggleBtn(false)} className="nav-link">
              <TbSettings className="sm-icons" />
              <span>Settings</span>
            </Link>
          </li>
          <li>
            <button onClick={logoutButton} className="btn btn-xs">
              <RiLogoutCircleRLine className="sm-icons" />
              <span>Logout</span>
            </button>
          </li>
          <button
            onClick={() => setToggleBtn(false)}
            className="btn  btn-xs btn-ghost absolute top-1 right-1"
          >
            <HiMiniXMark className="w-5 h-5" />
          </button>
        </ul>
      </div>
    </div>
  );
}

export default MdNavMenu;
