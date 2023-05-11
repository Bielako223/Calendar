// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDySypSeYQZlTmcL1knWpC2dDma1ePA6pk",
  authDomain: "calendar-78d75.firebaseapp.com",
  projectId: "calendar-78d75",
  storageBucket: "calendar-78d75.appspot.com",
  messagingSenderId: "171703193344",
  appId: "1:171703193344:web:9328773ef8800c10fc2de5",
  measurementId: "G-386KPN1YSC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);