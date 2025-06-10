import { onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { collection, query, where } from "firebase/firestore";

//useEffect
import { useEffect, useState } from "react";

export function useAllCollection(collectionName, Arr) {
  console.log(Arr);
  const [data, setData] = useState(null);
  useEffect(() => {
    const q = query(collection(db, collectionName), where(...Arr));

    onSnapshot(q, (querySnapshot) => {
      const queryData = [];
      querySnapshot.forEach((doc) => {
        queryData.push(doc.data().name);
        setData(queryData);
      });
    });

    // onSnapshot(collection(db, collectionName), (querySnapshot) => {
    //   const queryData = [];
    //   querySnapshot.forEach((doc) => {
    //     queryData.push({ id: doc.id, ...doc.data() });
    //     setData(queryData);
    //   });
    // });
  }, []);

  return { data };
}
