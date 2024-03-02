// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
import { getFirestore } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD14g0llk0GCMmuV2daxa6UkMIqipRSXWM",
  authDomain: "chat-app-eb124.firebaseapp.com",
  projectId: "chat-app-eb124",
  storageBucket: "chat-app-eb124.appspot.com",
  messagingSenderId: "76910889611",
  appId: "1:76910889611:web:5362966cbee3212a1e228e",
  measurementId: "G-X191938KT0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);// main app config
export const auth = getAuth() // authentication
export const storage = getStorage() // file storage
export const db = getFirestore()  // database