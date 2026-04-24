// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyALbSoUMXHEinEqeX8iO-HE8yHYFw9t1v8",
  authDomain: "react-firebase-prototype.firebaseapp.com",
  projectId: "react-firebase-prototype",
  storageBucket: "react-firebase-prototype.firebasestorage.app",
  messagingSenderId: "1060163476000",
  appId: "1:1060163476000:web:c70607aba54b9308f33a45",
  measurementId: "G-EFSZZ8NDG7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };