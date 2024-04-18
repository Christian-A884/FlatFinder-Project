import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCtfnwv7Cia3klMLgyCTImSaLYEbL9cSNo",
  authDomain: "flatfinder-4a2c9.firebaseapp.com",
  projectId: "flatfinder-4a2c9",
  storageBucket: "flatfinder-4a2c9.appspot.com",
  messagingSenderId: "870804496963",
  appId: "1:870804496963:web:fc6e86a15b5edf465eaaf6"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const db = getFirestore(app)