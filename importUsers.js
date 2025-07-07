import admin from "firebase-admin";
import fs from "fs";

// ⬇️ Bu fayl — YANGI Firebase loyihangizga tegishli bo'lishi kerak
const serviceAccount = JSON.parse(
  fs.readFileSync("newServiceAccountKey.json", "utf8")
);
const users = JSON.parse(fs.readFileSync("exportedUsers.json", "utf8"));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

async function importUsers() {
  for (const user of users) {
    try {
      await admin.auth().createUser({
        uid: user.uid,
        email: user.email,
        emailVerified: user.emailVerified,
        disabled: user.disabled,
      });
      console.log(`✅ Imported: ${user.email}`);
    } catch (error) {
      if (error.code === "auth/uid-already-exists") {
        console.log(`ℹ️ User already exists: ${user.email}`);
      } else {
        console.error(`❌ Error importing ${user.email}: ${error.message}`);
      }
    }
  }
}

importUsers().catch(console.error);
