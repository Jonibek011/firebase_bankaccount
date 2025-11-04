import { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../firebase/firebaseConfig";
function UserStatus({ userId }) {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const userStatusRef = ref(db, `/status/${userId}`);

    const unsubscribe = onValue(userStatusRef, (snapshot) => {
      const data = snapshot.val();
      setStatus(data?.state || "offline");
    });

    // cleanup — komponent unmount bo‘lganda listenerni olib tashlash
    return () => unsubscribe();
  }, [userId]);

  return (
    <span className={status === "online" ? "text-green-500" : "text-gray-400"}>
      {status === "online" ? "Online" : "Offline"}
    </span>
  );
}

export default UserStatus;
