// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: VITE_FIREBASE_VITE_FIREBASE_AUTH_DOMAIN,
  projectId: "blog-app-f25e7",
  storageBucket: "blog-app-f25e7.appspot.com",
  messagingSenderId: "752503277984",
  appId: "1:752503277984:web:fb6db1c370f6b73ecffcc5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);