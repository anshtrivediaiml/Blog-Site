
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "blog-app-f25e7.firebaseapp.com",
  projectId: "blog-app-f25e7",
  storageBucket: "blog-app-f25e7.appspot.com",
  messagingSenderId: "752503277984",
  appId: "1:752503277984:web:fb6db1c370f6b73ecffcc5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);