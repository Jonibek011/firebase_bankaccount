import {
  collection,
  addDoc,
  setDoc,
  query,
  where,
  getDocs,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { doc, deleteDoc } from "firebase/firestore";

export const useFirestore = () => {
  const addDocument = async (collectionName, data) => {
    await addDoc(collection(db, collectionName), data);
  };

  const addUserDocument = async (user) => {
    await setDoc(doc(db, "Users", user.uid), {
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      createdAt: serverTimestamp(),
    });
  };

  const getUserChats = async (userId) => {
    const chatsRef = collection(db, "chats");
    const q = query(chatsRef, where("users", "array-contains", userId));
    const querySnapshot = await getDocs(q);

    const chats = [];
    querySnapshot.forEach((doc) => {
      chats.push({ id: doc.id, ...doc.data() });
    });

    return chats;
  };

  const deleteDocument = async (collectionName, id) => {
    try {
      await deleteDoc(doc(db, collectionName, id));
      console.log(`✅ ${collectionName}/${id} o‘chirildi`);
    } catch (err) {
      console.error("❌ O‘chirishda xatolik:", err);
    }
  };

  const updateDocument = async (collectionName, id, key, value) => {
    const docRef = doc(db, collectionName, id);

    await updateDoc(docRef, {
      [key]: value,
    });
  };

  return {
    addDocument,
    deleteDocument,
    updateDocument,
    addUserDocument,
    getUserChats,
  };
};
