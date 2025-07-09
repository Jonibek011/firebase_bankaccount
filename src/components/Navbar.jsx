import { Link } from "react-router-dom";

//react-icons
import { IoNotifications } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
//context
import useGlobalContext from "../hooks/useGlobalContext";
import { useEffect, useMemo, useState } from "react";
//useLogout
import { useLogout } from "../hooks/useLogout";
import MdNavMenu from "./MdNavMenu";

//Data from localstorage
const themeFromLocal = localStorage.getItem("dark_mode") || "light";
//Main function
function Navbar() {
  const [toggleBtn, setToggleBtn] = useState(false);
  const [theme, setTheme] = useState(themeFromLocal);
  const { user, tasks } = useGlobalContext();

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
  const uncompletedTasks = useMemo(() => {
    if (!tasks) return;
    return tasks.filter((item) => item.status !== "Completed");
  }, [tasks]);

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

          <label className="flex cursor-pointer gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="5" />
              <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
            </svg>
            <input
              onClick={toggleDarkMode}
              type="checkbox"
              value="synthwave"
              className="toggle theme-controller"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
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
                {uncompletedTasks?.length}
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
