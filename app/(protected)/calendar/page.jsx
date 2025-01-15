'use client'
import React from "react";
import { useState ,useEffect} from "react";
import Monthview from "./components/monthView";
import WeekSchedule from "./components/weekView";
import { useCall } from "@/app/lib/AuthContext";



function CalendarView(){
    const [isMonth,setIsMonth]=useState(true)
    
    const {provDate,setProvDate}=useCall();

    function changeView(boole){
        setIsMonth(boole)
    }
    //console.log(currDate+"tututtu")
    



    return (
        <div className="flex flex-col w-full h-full justify-between mt-24">
            <div className=" flex justify-center mb-4">
                <button onClick={() => setIsMonth(false)} className="mx-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">Tydzień</button>
                <button onClick={() => setIsMonth(true)}  className="mx-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">Miesiąc</button>
            </div>
        <div className="flex justify-center w-full flex-grow">
        {isMonth
        ?<Monthview changeView={changeView}></Monthview>
        :<WeekSchedule></WeekSchedule>}
        </div>



        </div>
    )
}

export default CalendarView