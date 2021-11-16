/*
import { initializeApp } from "firebase/app";
import {getFirestore} from '@firebase/firestore';
import { getAuth } from "firebase/auth";



const firebaseConfig = {
    apiKey: "AIzaSyCGlsQFeV4hf1PnIYUgXGuNhR1TGhMJJf0",
    authDomain: "musichook-7e5d1.firebaseapp.com",
    projectId: "musichook-7e5d1",
    storageBucket: "musichook-7e5d1.appspot.com",
    messagingSenderId: "193549723974",
    appId: "1:193549723974:web:5328ffce3a1f75eef51d47",
    measurementId: "G-WS6THVDRZG"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);*/

import "firebase/auth"
import firebase from "firebase/compat";
import {getFirestore} from "@firebase/firestore";

const app = firebase.initializeApp({

    apiKey: "AIzaSyCGlsQFeV4hf1PnIYUgXGuNhR1TGhMJJf0",
    authDomain: "musichook-7e5d1.firebaseapp.com",
    projectId: "musichook-7e5d1",
    storageBucket: "musichook-7e5d1.appspot.com",
    messagingSenderId: "193549723974",
    appId: "1:193549723974:web:5328ffce3a1f75eef51d47",
    measurementId: "G-WS6THVDRZG"

})
export default app
export const auth = app.auth()
export const db = getFirestore();


