import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import toast from "react-hot-toast";

export const useFirestore = () => {
  const addDocument = async (collectionName, id, data) => {
    await setDoc(doc(db, collectionName, id), data);
  };

  const deleteDocument = () => {};

  return { addDocument, deleteDocument };
};
