import { Link } from "react-router-dom";

//firebase
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

//toast
import { toast } from "react-hot-toast";
//context
import useGlobalContext from "../hooks/useGlobalContext";
function Navbar() {
  const { dispatch } = useGlobalContext();
  const signOutUser = () => {
    signOut(auth)
      .then(() => {
        toast.success("See you soon");
        dispatch({ type: "LOGOUT" });
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div>
      <header>
        <nav className="px-5 flex gap-2">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <button onClick={signOutUser} type="button">
            Sign Out
          </button>
        </nav>
      </header>
    </div>
  );
}

export default Navbar;
