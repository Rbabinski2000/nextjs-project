'use client'
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useCall } from "@/app/lib/AuthContext";

function MonthView({ changeView }) {
    const { provDate, currDate, setProvDate } = useCall();
    const [now, setNow] = useState(new Date(provDate));
    const [isMonday, setIsMonday] = useState(false);
    const [isToday, setIsToday] = useState(false);
    const [isYearListVisible, setIsYearListVisible] = useState(false); // Stan kontrolujący widoczność listy lat

    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const months = [
        "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
    ];

    useEffect(() => {
        checkDate();
    }, []);
    
    useEffect(() => {
        setNow(new Date(provDate));
        checkDate();
    }, [provDate]);

    const Month = now.getMonth();

    const first = ScanMonthForFirstDay(now);
    const last = ScanMonthForLastDay(now);
    const currMonth = ArrayForCurrentMonth(last, now);
    const Before = BeforeCurrentMonth(now, first);

    useEffect(() => {
        if (first === 1) {
            setIsMonday(true);
        } else {
            setIsMonday(false);
        }
    }, [first]);

    function checkDate() {
        const curr = new Date(currDate);
        const prov = new Date(provDate);
        if (curr.getFullYear() === prov.getFullYear() && curr.getMonth() === prov.getMonth()) {
            setIsToday(true);
        } else {
            setIsToday(false);
        }
    }

    function changeMonthOfDate(month) {
        let temp = new Date(provDate);
        temp.setMonth(temp.getMonth() + month);
        setProvDate(new Date(temp));
    }

    function goToWeekend(data) {
        setProvDate(new Date(data));
        changeView(false);
    }

    // Wyświetlanie listy lat w rozwijanym menu
    function toggleYearList() {
        setIsYearListVisible(prev => !prev);
    }

    function changeYear(year) {
        let temp = new Date(provDate);
        temp.setFullYear(year);
        setProvDate(new Date(temp));
        setIsYearListVisible(false);
    }

    return (
        <div className="flex flex-col items-center w-[70%]">
            {/* Górna część z przyciskami i datą */}
            <div className="flex items-center justify-between p-4 w-[50%]">
                {/* Przycisk '←' */}
                <button onClick={() => changeMonthOfDate(-1)} className="bg-gray-500 text-white px-4 py-2 rounded-full shadow hover:bg-gray-700">
                    ←
                </button>

                {/* Data (wyśrodkowana pomiędzy przyciskami) */}
                <div className="relative">
                    
                <h1 className="text-2xl font-bold flex items-center">
                    <input 
                        type="number" 
                        readOnly 
                        value={now.getFullYear()} 
                        onClick={toggleYearList}
                        className="bg-transparent text-lg text-center cursor-pointer w-24 focus:outline-none mr-2 px-2 py-1 rounded-md border-b-2 border-gray-300"
                    />
                    {months[Month]}
                </h1>
                    {/* Przycisk do rozwinięcia listy lat */}
                    

                    {/* Lista lat */}
                    {isYearListVisible && (
                        <div className="absolute top-full left-0 mt-2 w-32 max-h-48 overflow-y-auto bg-white border shadow-lg z-10">
                            {Array.from({ length: 50 }, (_, i) => currDate.getFullYear()+2 - i).map(year => (
                                <button
                                    key={year}
                                    onClick={() => changeYear(year)}
                                    className="block w-full text-left p-2 hover:bg-gray-200"
                                >
                                    {year}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Przycisk '→' */}
                <button onClick={() => changeMonthOfDate(1)} className="bg-gray-500 text-white px-4 py-2 rounded-full shadow hover:bg-gray-700">
                    →
                </button>
            </div>

            {/* Kalendarz */}
            <div className="grid grid-cols-7 gap-1 w-[70%]">
                {/* Nagłówki dni */}
                {days.map((day) => (
                    <div key={day} className="text-center font-semibold bg-gray-200 p-2">
                        {day}
                    </div>
                ))}

                {/* Wyświetlanie dni przed rozpoczęciem miesiąca */}
                {!isMonday ? 
                    Before.map((day) => (
                        <Link key={day+50} href="/calendar">
                            <div key={day.getDate()} className="border p-2 text-sm cursor-pointer bg-gray-50 hover:bg-blue-100">{day.getDate()}</div>
                        </Link>
                    )) : ""
                }

                {/* Wyświetlanie dni miesiąca */}
                {currMonth.map((day) => (
                    <div 
                        key={`${day.getDate()}`} 
                        onClick={() => goToWeekend(day)} 
                        className={`border border-black p-2 text-sm cursor-pointer bg-gray-50 hover:bg-blue-100 ${
                            isToday && day.getDate() === currDate.getDate() ? "bg-slate-950 text-white" : ""
                        }`}
                    >
                        {day.getDate()}
                    </div>
                ))}
            </div>
        </div>
    );
}

function ScanMonthForFirstDay(date) {
    let temp = new Date(date);
    temp.setDate(1);
    return temp.getDay();
}

function ScanMonthForLastDay(date) {
    let temp = new Date(date);
    const month = temp.getMonth();
    temp.setMonth(month + 1);
    temp.setDate(0);
    return temp.getDate();
}

function BeforeCurrentMonth(date, number) {
    let temp = new Date(date);
    temp.setDate(0);
    const end = temp.getDate();
    temp.setDate(temp.getDate() - (number - 2));

    let array = [];
    for (let i = 0; i <= (number - 2); i++) {
        array.push(new Date(temp));
        temp.setDate(temp.getDate() + 1);
    }
    return array;
}

function ArrayForCurrentMonth(Last, date) {
    let one = new Date(date);
    one.setDate(1);
    let array = [];
    for (let i = 1; i <= Last; i++) {
        array.push(new Date(one));
        one.setDate(one.getDate() + 1);
    }
    return array;
}

export default MonthView;
