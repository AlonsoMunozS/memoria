// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB0Dw_x60ickmSUefveZsiwkcR4YgAYHPg",
  authDomain: "memoria-9bc6e.firebaseapp.com",
  projectId: "memoria-9bc6e",
  storageBucket: "memoria-9bc6e.appspot.com",
  messagingSenderId: "575716460367",
  appId: "1:575716460367:web:ac0bfc3ef525b889eca73a"
};

// Initialize Firebase
export const firebaseAuth = initializeApp(firebaseConfig);