import { collection, addDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { doc, deleteDoc } from "firebase/firestore";

export const useFirestore = () => {
  const addDocument = async (collectionName, data) => {
    await addDoc(collection(db, collectionName), data);
  };

  const deleteDocument = async (collectionName, id) => {
    await deleteDoc(doc(db, collectionName, id));
  };

  const updateDocument = async (collectionName, id, key, value) => {
    const docRef = doc(db, collectionName, id);

    await updateDoc(docRef, {
      [key]: value,
    });
  };

  return { addDocument, deleteDocument, updateDocument };
};
