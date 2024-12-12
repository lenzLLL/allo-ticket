// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDAXLTDi_0ek3hACdPtMqyqzvOTInIy3dI",
  authDomain: "commune1-eb9ef.firebaseapp.com",
  projectId: "commune1-eb9ef",
  storageBucket: "commune1-eb9ef.appspot.com",
  messagingSenderId: "740557356257",
  appId: "1:740557356257:web:57b8a35f7610c5ad3b4ba0",
  measurementId: "G-MPPLE5CR5R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const analytics = getAnalytics(app);
export {auth}