import {
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import useGlobalContext from "./useGlobalContext";
import toast from "react-hot-toast";

//main function
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

  const LoginWithEmail = (displayName, email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        await updateProfile(auth.currentUser, {
          displayName: displayName,
          photoURL: `https://api.dicebear.com/9.x/initials/svg?seed=${displayName}`,
        });
        const user = userCredential.user;

        dispatch({ type: "LOGIN", payload: user });
      })
      .catch((error) => {
        const errorMessage = error.message;
        if (errorMessage == "Firebase: Error (auth/email-already-in-use).") {
          toast.error("This email already signed up!");
        } else {
          toast.error(errorMessage);
        }
      });
  };

  const LoginWithEmailAndPassword = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        dispatch({ type: "LOGIN", payload: user });
      })
      .catch((error) => {
        const errorMessage = error.message;
        if (errorMessage == "Firebase: Error (auth/invalid-credential).") {
          toast.error("User is not defined!");
        } else if (errorMessage == "Firebase: Error (auth/missing-password).") {
          toast.error("Please enter correct password!");
        } else if (errorMessage == "Firebase: Error (auth/invalid-email).") {
          toast.error("Please enter your email!");
        } else {
          toast.error(errorMessage);
        }
      });
  };
  return { LoginWithGoogle, LoginWithEmail, LoginWithEmailAndPassword };
}

export default useRegister;
