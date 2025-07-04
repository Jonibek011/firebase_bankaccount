import { Link } from "react-router-dom";

//react-icons
import { IoNotifications } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
//context
import useGlobalContext from "../hooks/useGlobalContext";
import { useEffect, useState } from "react";
//useLogout
import { useLogout } from "../hooks/useLogout";
import MdNavMenu from "./MdNavMenu";

//Data from localstorage
const themeFromLocal = localStorage.getItem("dark_mode") || "light";
//Main function
function Navbar() {
  const [toggleBtn, setToggleBtn] = useState(false);
  const [theme, setTheme] = useState(themeFromLocal);
  const { user } = useGlobalContext();

  //signout function
  const { signOutUser } = useLogout();

  //dark-light mode function
  const toggleDarkMode = () => {
    const newTheme = theme == "light" ? "dracula" : "light";

    setTheme(newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("dark_mode", theme);
  }, [theme]);

  return (
    <>
      <div className="navbar shadow-sm  px-[5%] flex justify-between  items-center bg-base-100 relative z-50 h-14">
        <div className="navLogo hidden md:flex justify-center items-center bg-transparent">
          <h1 className=" text-3xl font-bold">
            <span className="text-blue-700">Life</span>
            <span>Hub</span>
          </h1>
        </div>
        <div className="toggle-button">
          <button
            onClick={() => setToggleBtn(true)}
            className="p-2 bg-base-200 rounded-lg md:hidden "
          >
            <RxHamburgerMenu className="w-5 h-5" />
          </button>
        </div>
        <div className="flex gap-3 md:gap-5 ">
          {/* ================ Theme Controller ====================================== */}

          <label className="cursor-pointer">
            <input
              onChange={toggleDarkMode}
              type="checkbox"
              value="synthwave"
              className="toggle theme-controller scale-75 md:scale-75 "
            />
            <span className="ml-2 text-sm hidden ">Dark Mode</span>
          </label>

          <Link
            to="/tasks"
            className="new-task-button btn hidden md:flex justify-center items-center"
          >
            New Task
          </Link>

          {/* ================ Notification ======================== */}
          <div className="notification">
            <Link className="relative">
              <IoNotifications className="w-6 h-6 text-gray-400 " />
              <div className="badge badge-ghost badge-xs absolute -top-2 -right-2">
                0
              </div>
            </Link>
          </div>
          {/* ================= Profile =========================================== */}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-8 md:w-9 rounded-full">
                {user.photoURL && (
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={user.photoURL}
                  />
                )}
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <button onClick={signOutUser}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <MdNavMenu toggleBtn={toggleBtn} setToggleBtn={setToggleBtn} />
    </>
  );
}

export default Navbar;
