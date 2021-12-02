// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "@firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCGlsQFeV4hf1PnIYUgXGuNhR1TGhMJJf0",
  authDomain: "musichook-7e5d1.firebaseapp.com",
  projectId: "musichook-7e5d1",
  storageBucket: "musichook-7e5d1.appspot.com",
  messagingSenderId: "193549723974",
  appId: "1:193549723974:web:5328ffce3a1f75eef51d47",
  measurementId: "G-WS6THVDRZG",
};

// Initialize Firebase
//  Check if server-side as single time pattern
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const auth = getAuth();
const storage = getStorage();

export { app, db, auth, storage };
