// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore/lite";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD3OxzrxI8tQNQsdJxuPeGa9NShOxAFTCY",
    authDomain: "events-app-2023.firebaseapp.com",
    projectId: "events-app-2023",
    storageBucket: "events-app-2023.appspot.com",
    messagingSenderId: "715881674316",
    appId: "1:715881674316:web:7c30fcbfe894c3313066e9",
    measurementId: "G-0EG0VJMQNL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { analytics, auth, firestore, storage }