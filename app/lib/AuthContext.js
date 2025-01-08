'use client'
import { useState,createContext,useEffect,useContext } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "./firebase"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

const CalendarContext=createContext();

export const CalendarProvider=({children})=>{
  const[currDate,setCurrDate]=useState(new Date(Date.now()))
  const[provDate,setProvDate]=useState(new Date(Date.now()))

  return (
    <CalendarContext.Provider value={{currDate,setCurrDate,provDate,setProvDate}}>
      {children}
    </CalendarContext.Provider>
  )
}

export const useCall=()=>useContext(CalendarContext)