import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import useGlobalContext from "./useGlobalContext";

function useRegister() {
  const { dispatch } = useGlobalContext();
  const provider = new GoogleAuthProvider();
  const LoginWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        dispatch({ type: "LOGIN", payload: user });
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };
  return { LoginWithGoogle };
}

export default useRegister;
