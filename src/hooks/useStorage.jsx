import { storage } from "../firebase/firebaseConfig";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
//firebase/auth
import { updateProfile } from "firebase/auth";
//auth
import { auth } from "../firebase/firebaseConfig";
//GlobalZContext
import useGlobalContext from "../hooks/useGlobalContext";
import toast from "react-hot-toast";
//update document
import { useFirestore } from "../hooks/useFirestore";
//main function
export const useStorage = () => {
  const { user, dispatch } = useGlobalContext();
  const { updateDocument } = useFirestore();
  //function
  const UploadUserImage = async (imageBase64) => {
    const storageRef = ref(storage, `ProfileImage/${user.uid}.png`);
    dispatch({ type: "LOADING", payload: true });

    try {
      await uploadString(storageRef, imageBase64, "data_url");
      const downloadURL = await getDownloadURL(storageRef);
      updateProfile(auth.currentUser, {
        photoURL: downloadURL,
      })
        .then(() => {
          dispatch({
            type: "LOGIN",
            payload: { ...user, photoURL: downloadURL },
          });

          updateDocument("Users", user.uid, "photoURL", downloadURL);
        })
        .catch((err) => {
          toast.error(err.message);
        })
        .finally(() => {
          dispatch({ type: "LOADING", payload: false });
        });
    } catch (err) {
      toast.error(err.message);
    }
  };

  return { UploadUserImage };
};
