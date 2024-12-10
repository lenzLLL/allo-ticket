// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAfBAwUOHEE2qiPKl8HJ3ECyazN-ZcRhFQ",
  authDomain: "cameragro-d91b5.firebaseapp.com",
  projectId: "cameragro-d91b5",
  storageBucket: "cameragro-d91b5.firebasestorage.app",
  messagingSenderId: "193535646927",
  appId: "1:193535646927:web:2c19e6d95838300ba7ebba",
  measurementId: "G-PTPMMSM2LM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const analytics = getAnalytics(app);
export {auth}