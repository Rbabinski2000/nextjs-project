// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app"
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    
  apiKey: "AIzaSyDjx1YdVT_yuNSGi-efYeiOvW6PC6RBBjI",

  authDomain: "project-database-c809e.firebaseapp.com",

  projectId: "project-database-c809e",

  storageBucket: "project-database-c809e.firebasestorage.app",

  messagingSenderId: "293968408165",

  appId: "1:293968408165:web:bba0e9a54168c615c7608c",

  measurementId: "G-4VHX3732LG"

};


// Initialize Firebase
if (!firebase.app.length) {
    console.log(process.env)
    firebase.initializeApp(firebaseConfig)
  }
  console.log(process.env)
const app = initializeApp(firebaseConfig);

//const analytics = getAnalytics(app);

export {app}
export default firebase