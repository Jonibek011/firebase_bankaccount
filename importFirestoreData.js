import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import fs from "fs";

// 🔑 YANGI FIREBASE LOYIHANGIZNING CONFIG'INI BU YERGA QO'YING
const firebaseConfig = {
  apiKey: "AIzaSyCHj0m-tW0eViqndlyQpmX2f_r7JmL4_aQ",
  authDomain: "lifehub-firebase.firebaseapp.com",
  projectId: "lifehub-firebase",
  storageBucket: "lifehub-firebase.firebasestorage.app",
  messagingSenderId: "60355956605",
  appId: "1:60355956605:web:8f656fefd9be78b149c614",
  measurementId: "G-Q5GN603X48",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const collections = ["Expenses", "Tasks", "Users", "chats", "userChats"];

(async () => {
  for (const col of collections) {
    const filePath = `./${col}.json`;
    if (!fs.existsSync(filePath)) {
      console.log(`❌ Fayl topilmadi: ${filePath}`);
      continue;
    }

    const raw = fs.readFileSync(filePath);
    const data = JSON.parse(raw);

    for (const item of data) {
      const { id, ...rest } = item;
      await setDoc(doc(db, col, id), rest);
    }

    console.log(`✅ Imported ${col} (${data.length} documents)`);
  }
})();
