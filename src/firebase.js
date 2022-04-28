// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getStorage, ref } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDd4Z-l4pNgCJ4dJRgtcdtHtV3NdGxQ0HI",
    authDomain: "album-6b590.firebaseapp.com",
    databaseURL: "https://album-6b590.firebaseio.com",
    projectId: "album-6b590",
    storageBucket: "album-6b590.appspot.com",
    messagingSenderId: "278790651261",
    appId: "1:278790651261:web:8b9be738f9e0af8d0ce014",
    measurementId: "G-J8H4E79FRQ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app)
export const storage = getStorage(app)
// export const storageRef = ref(storage)