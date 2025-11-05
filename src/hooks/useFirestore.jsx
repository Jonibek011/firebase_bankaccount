import {
  collection,
  addDoc,
  setDoc,
  query,
  where,
  getDocs,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { doc, deleteDoc } from "firebase/firestore";
import toast from "react-hot-toast";

export const useFirestore = () => {
  const addDocument = async (collectionName, data) => {
    await addDoc(collection(db, collectionName), data);
  };

  const addOrUpdateLimit = async (userId, category, amount) => {
    try {
      const userDocRef = doc(db, "expenseLimits", userId);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        await updateDoc(userDocRef, {
          [`limits.${category}`]: amount,
        });
        toast.success(`${category} limit updated to ${amount}`);
      } else {
        await setDoc(userDocRef, {
          userId,
          limits: {
            [category]: amount,
          },
        });
        toast.success(`${category} limit updated to ${amount}`);
      }
    } catch (err) {
      toast.error("Firebase error: ", err);
    }
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
    addOrUpdateLimit,
  };
};
