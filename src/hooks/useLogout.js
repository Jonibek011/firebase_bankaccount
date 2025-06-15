//firebase
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

import toast from "react-hot-toast";
//globalContext
import useGlobalContext from "./useGlobalContext";

export const useLogout = () => {
  const { dispatch } = useGlobalContext();

  const signOutUser = async () => {
    try {
      await signOut(auth);
      toast.success("See you soon");
      dispatch({ type: "LOGOUT" });
    } catch (err) {
      console.log(err.message);
      toast.error("Failed to logout");
    }
  };

  return { signOutUser };
};
