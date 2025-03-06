// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: undefined,
  authDomain: "projekt-mistrz.firebaseapp.com",
  projectId: "projekt-mistrz",
  storageBucket: "projekt-mistrz.appspot.com",
  messagingSenderId: undefined,
  appId: undefined,
  measurementId: undefined,
};

// Initialize Firebase
export default initializeApp(firebaseConfig);
