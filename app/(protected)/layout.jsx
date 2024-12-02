'use client'
import { useAuth } from "@/app/lib/AuthContext";
import { useState,useEffect } from "react";
import { redirect } from 'next/navigation';
import { usePathname } from 'next/navigation';

function Protected({children}) {
    const { user,loading } = useAuth();
    const returnUrl = usePathname();
    const [authChecked,setAuthChecked]=useState(false)
    useEffect(() => {
        (async () => {
            if(!loading){
                if(!user){
                    redirect(`/user/signin?returnUrl=${returnUrl}`);
                }else{
                    setAuthChecked(true);
                }
            }
        })()
    }, [user,loading,returnUrl]);
    if(!authChecked){
        return <div>...loading</div>
    }
    return ( 
        <>
            { children }
        </> 
        );
}

export default Protected;