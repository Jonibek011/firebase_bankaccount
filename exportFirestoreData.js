import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import fs from "fs";

// 🔑 ESKI FIREBASE LOYIHANGIZNING CONFIG'INI BU YERGA QO'YING
const firebaseConfig = {
  apiKey: "AIzaSyDGA06-Af8_T0lHItsaYsg45gluyi2ystI",
  authDomain: "newproject-cb3c7.firebaseapp.com",
  projectId: "newproject-cb3c7",
  storageBucket: "newproject-cb3c7.firebasestorage.app",
  messagingSenderId: "717169667291",
  appId: "1:717169667291:web:c14b9d0d88449c21f870fe",
  measurementId: "G-EJ73W82FDW",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const collections = ["Expenses", "Tasks", "Users", "chats", "userChats"];

(async () => {
  for (const col of collections) {
    const snapshot = await getDocs(collection(db, col));
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    fs.writeFileSync(`./${col}.json`, JSON.stringify(data, null, 2));
    console.log(`✅ Exported ${col} (${data.length} documents)`);
  }
})();
