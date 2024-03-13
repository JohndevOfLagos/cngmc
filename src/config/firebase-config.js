// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import  {
  getAuth, 
  GoogleAuthProvider
 } from "firebase/auth"
 import { getFirestore } from 'firebase/firestore';
 // TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC_EnQ8jIKW-75ppP3Mo5FSMJJd66rxDeY",
  authDomain: "cong-national-guard-membership.firebaseapp.com",
  projectId: "cong-national-guard-membership",
  storageBucket: "cong-national-guard-membership.appspot.com",
  messagingSenderId: "593734536167",
  appId: "1:593734536167:web:8e71c454040978637e4b42",
  measurementId: "G-STHN1VXVLV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app)
