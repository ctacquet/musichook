import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebase from "firebase/app";

firebase.initializeApp({
  apiKey: "AIzaSyCGlsQFeV4hf1PnIYUgXGuNhR1TGhMJJf0",
  authDomain: "musichook-7e5d1.firebaseapp.com",
  projectId: "musichook-7e5d1",
  storageBucket: "musichook-7e5d1.appspot.com",
  messagingSenderId: "193549723974",
  appId: "1:193549723974:web:5328ffce3a1f75eef51d47",
  measurementId: "G-WS6THVDRZG"
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
