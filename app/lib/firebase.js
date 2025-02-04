
// Import the functions you need from the SDKs you need
import { initializeApp,getApp,getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"    
//import { getAnalytics } from "firebase/analytics";
//import "./envConfig";


// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

//const pdir=process.cwd()
  //loadEnvConfig(pdir)
// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    
  apiKey: process.env.NEXT_PUBLIC_API_KEY,

  authDomain: process.env.NEXT_PUBLIC_authDomain,

  projectId: process.env.NEXT_PUBLIC_projectId,

  storageBucket: process.env.NEXT_PUBLIC_storageBucket,

  messagingSenderId:process.env.NEXT_PUBLIC_messagingSenderId,

  appId: process.env.NEXT_PUBLIC_appId,

  measurementId: process.env.NEXT_PUBLIC_measurementId

};

  
// Initialize Firebase
  //console.log(process)
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();
const auth=getAuth(app)
const db = getFirestore(app); 

//const analytics = getAnalytics(app);

export {app,auth,db}
