// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "Keys here",
  authDomain: "authentication-b3572.firebaseapp.com",
  databaseURL: "https://authentication-b3572.firebaseio.com",
  projectId: "authentication-b3572",
  storageBucket: "authentication-b3572.appspot.com",
  messagingSenderId: "481589792729",
  appId: "1:481589792729:web:744640191a1cb1b42693c8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app)
