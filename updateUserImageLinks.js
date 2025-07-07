import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import fs from "fs";

// 🔐 serviceAccount faylini o‘qiymiz
const serviceAccount = JSON.parse(
  fs.readFileSync("serviceAccountKey.json", "utf8")
);

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

async function updatePhotoURLs() {
  const usersSnapshot = await db.collection("Users").get();

  const updates = usersSnapshot.docs.map(async (doc) => {
    const data = doc.data();

    if (data.photoURL && data.photoURL.includes("newproject-cb3c7")) {
      const newURL = data.photoURL.replace(
        "newproject-cb3c7.appspot.com",
        "lifehub-firebase.appspot.com"
      );

      await db.collection("Users").doc(doc.id).update({ photoURL: newURL });

      console.log(`✅ Updated: ${doc.id}`);
    }
  });

  await Promise.all(updates);
  console.log("🔁 Barcha photoURL yangilandi.");
}

updatePhotoURLs();
