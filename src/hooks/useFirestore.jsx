import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export const useFirestore = () => {
  const addDocument = async (collectionName, data) => {
    await addDoc(collection(db, collectionName), data);
  };

  const deleteDocument = () => {};

  return { addDocument, deleteDocument };
};
