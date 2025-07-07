// listUsers.js
import admin from "firebase-admin";
import fs from "fs";

// Service account JSON faylni o'z loyihangizdan yuklab oling (eski projectdan)
const serviceAccount = JSON.parse(
  fs.readFileSync("serviceAccountKey.json", "utf8")
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const auth = admin.auth();

async function exportUsers() {
  const allUsers = [];
  let nextPageToken;

  do {
    const result = await auth.listUsers(1000, nextPageToken);
    result.users.forEach((userRecord) => {
      allUsers.push({
        uid: userRecord.uid,
        email: userRecord.email,
        emailVerified: userRecord.emailVerified,
        disabled: userRecord.disabled,
        metadata: userRecord.metadata,
        providerData: userRecord.providerData,
      });
    });

    nextPageToken = result.pageToken;
  } while (nextPageToken);

  fs.writeFileSync("exportedUsers.json", JSON.stringify(allUsers, null, 2));
  console.log(`✅ Exported ${allUsers.length} users`);
}

exportUsers().catch(console.error);
