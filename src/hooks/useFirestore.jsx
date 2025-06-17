import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { doc, deleteDoc } from "firebase/firestore";

export const useFirestore = () => {
  const addDocument = async (collectionName, data) => {
    await addDoc(collection(db, collectionName), data);
  };

  const deleteDocument = async (collectionName, id) => {
    await deleteDoc(doc(db, collectionName, id));
  };

  return { addDocument, deleteDocument };
};
