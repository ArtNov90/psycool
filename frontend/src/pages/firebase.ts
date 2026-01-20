import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDZYQ6s0WL94zplBt2muY4bGeHUWLRw-Lk",
  authDomain: "psycool-90375.firebaseapp.com",
  projectId: "psycool-90375",
  storageBucket: "psycool-90375.firebasestorage.app",
  messagingSenderId: "870173348321",
  appId: "1:870173348321:web:4514c759b667e1c6bd82a0"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);