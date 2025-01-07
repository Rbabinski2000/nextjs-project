'use client'
import React, { useEffect } from "react";
import { useState } from "react";
import Link from "next/link";



function monthView(){
    const hours = Array.from({ length: 12 }, (_, i) => i + 8); // Godziny od 8:00 do 19:00
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ];
    const [isMonday,setIsMonday]=useState(false);
    const now=new Date(Date.now())
    const Month=now.getMonth()



    const first=ScanMonthForFirstDay(now)
    const last=ScanMonthForLastDay(now)
    const CurrDay=now.getDate();
    const CurrMonth=ArrayForCurrentMonth(last)
    
    if(first==1){
        setIsMonday(true);
    }
    const Before=BeforeCurrentMonth(now,first)
    console.log(Before)
    //const [schedule, setSchedule] = useState({});
    //const [selectedEvent, setSelectedEvent] = useState(null);

    // const day=new Date('2025-01-5');
    // console.log(day)
    // //const Month=
    // day.setDate(0)
    // cons)ole.log(day)
    
    
    return(
        <div className="flex flex-col items-center p-4">
            <h1 className="text-2xl font-bold mb-6">{now.getFullYear()} {months[Month]}</h1>
            <div className="grid grid-cols-7 gap-1 w-[70%]">
                {/* Nagłówki dni */}
                {/* <div></div> */}
                {days.map((day) => (
                <div key={day} className="text-center font-semibold bg-gray-200 p-2">
                    {day}
                </div>
                ))}
            
                {!isMonday?
                Before.map((day)=>(
                    <Link key={day+50}href={{pathname:'/calendar',query:{data:day.toJSON()}}}>
                        <div key={day.getDate()} className="border p-2 text-sm cursor-pointer bg-gray-50 text hover:bg-blue-100">{day.getDate()}</div></Link>
                )):""
                }
                {CurrMonth.map((day) => (
                <Link key={day+50}href={{pathname:'/calendar',query:{day:'tujest'}}}><div
                    key={`${day}`}
                    className={`border border-black p-2 text-sm cursor-pointer bg-gray-50 hover:bg-blue-100 ${
                        day === CurrDay ? "bg-slate-950 text-white" : ""
                      }`}>{day}</div></Link>
                ))}
                {/* Formularz edycji
                {selectedEvent && (
                    <EventForm
                    event={selectedEvent}
                    onClose={() => setSelectedEvent(null)}
                    onSave={handleEventUpdate}
                    />
                )} */}
            </div>
        </div>
  );
}
function ScanMonthForFirstDay(date){
    let temp =new Date(date);
    temp.setDate(1)
    return temp.getDay();
}
function ScanMonthForLastDay(date){
    let temp=new Date(date)
    const month=temp.getMonth();
    temp.setMonth(month+1);
    temp.setDate(0);
    return temp.getDate();
}
function BeforeCurrentMonth(date,number){
    let temp=new Date(date);
    temp.setDate(0)
    const end=temp.getDate()
    temp.setDate(temp.getDate()-(number-2))
    
    let array=new Array();
    for(let i=0;i<=(number-2);i++){
        array.push(new Date(temp));
        temp.setDate(temp.getDate()+1)
    }
    return array;
}
function ArrayForCurrentMonth(Last){
    let array=new Array();
    for(let i=1;i<=Last;i++){
        array.push(i);
    }
    return array
}
export default monthView;