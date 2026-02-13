// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCBHGQQkdtinS-WrGB7scq6_LJaUW_ZF3A",
  authDomain: "saveup-57a26.firebaseapp.com",
  projectId: "saveup-57a26",
  storageBucket: "saveup-57a26.firebasestorage.app",
  messagingSenderId: "537872084638",
  appId: "1:537872084638:web:45d365de63d6aee20ad58f",
  measurementId: "G-EK7ENY8V2B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);