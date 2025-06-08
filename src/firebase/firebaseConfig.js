import { getAuth } from "firebase/auth";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDGA06-Af8_T0lHItsaYsg45gluyi2ystI",
  authDomain: "newproject-cb3c7.firebaseapp.com",
  projectId: "newproject-cb3c7",
  storageBucket: "newproject-cb3c7.firebasestorage.app",
  messagingSenderId: "717169667291",
  appId: "1:717169667291:web:c14b9d0d88449c21f870fe",
  measurementId: "G-EJ73W82FDW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
