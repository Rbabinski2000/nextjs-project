'use client'
import { getAuth, signOut } from "firebase/auth";
import { useEffect,useState } from "react";
//import { auth } from "@/app/lib/firebase";
import { useAuth } from "@/app/lib/AuthContext";

export default function VerifyEmail() {
    
    const { user } = useAuth();
    const [registeredEmail,setRegisteredEmail]=useState("")


    useEffect(()=>{
        if(user?.email){
            setRegisteredEmail(user.email);
        }

        signOut(getAuth())
            .then(()=>{
                console.log("Wylogowano uzytkownika")
            })
            .catch((error)=>{
                //console.error(error.message)
            })
    },[user])
    return ( 
    <>
        <h1>Email not verified. Verify clicking on link in email send to your address {registeredEmail}</h1>
    </> );
}