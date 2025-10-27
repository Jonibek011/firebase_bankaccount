import { onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { collection, query, where } from "firebase/firestore";

//useEffect
import { useEffect, useState } from "react";

export function useAllCollection(collectionName, filterArr) {
  const [data, setData] = useState([]);
  useEffect(() => {
    // himoya: agar Arr hali undefined bo‘lsa yoki to‘liq emas
    if (!filterArr || filterArr.length !== 3) return;
    const q = query(collection(db, collectionName), where(...filterArr));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const queryData = [];
      querySnapshot.forEach((doc) => {
        queryData.push({ _id: doc.id, ...doc.data() });
      });
      setData(queryData);
    });

    return () => unsubscribe();
  }, [collectionName, JSON.stringify(filterArr)]);

  return { data };
}
