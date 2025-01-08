'use client'
import React, { use } from "react";
import { useState,useEffect } from "react";
import { useCall } from "@/app/lib/AuthContext";
import { DbCollectionSchedGet, DbCollectionSchedSet} from "@/app/(protected)/fireCollection";
import { useAuth } from "@/app/lib/AuthContext";


const WeekSchedule = () => {
  const {user}=useAuth();

  const hours = Array.from({ length: 14 }, (_, i) => i + 8); // Godziny od 8:00 do 19:00
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const {provDate,currDate,setProvDate}=useCall()
  const [fullWeekend,setFullWeekend]=useState(new Array());
  const[event,setEvents]=useState();
  
  const [schedule, setSchedule] = useState({});
  const [selectedEvent, setSelectedEvent] = useState(null);

  const [loading, setLoading] = useState(true); // Stan dla ładowania

  const[tableVal,setTableVal]=useState([[]])
  //console.log(provDate)
  // Funkcja do zarządzania zajęciami
  const handleEventUpdate = (day, hour, event,data) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [hour]: event,
      },
    }));
    setSelectedEvent(null);
    DbCollectionSchedSet(user,data,event)
    getData()
  };

  useEffect(() => {
    fullWeek();
    //getData();
      }, []);

  useEffect(() => {
    getData();
    //console.log(tableVal)
    }, [fullWeekend]);
  useEffect(() => {
    
    //console.log(tableVal)
    }, [tableVal]);

  function getData(){
    //console.log(fullWeekend[0])
    DbCollectionSchedGet(user,fullWeekend[0],fullWeekend[6])
    .then((data) => {
      
      //console.log(data[0][0])
      for(let i=0;i<data[0].length;i++){
        data[0][i].id=data[1][i];
      }
      console.log(data[0])
      setEvents(data[0]); // Przypisz dane do stanu
      setLoading(false); // Ustaw zakończenie ładowania
      
      fillTable(data[0]);
      
    })
    .catch((err) => {
      //setError(err.message); // Obsłuż błędy
      setLoading(false); // Ustaw zakończenie ładowania
    });
  }

  function fullWeek(){
  
    let temp=new Date(provDate);
    
    const numOfDay=((temp.getDay()+ 6) % 7);
    
    temp.setDate(temp.getDate()-numOfDay)
    const arr = Array.from({ length: 7 }, (_, i) => {
      // Tworzymy nową datę na podstawie `temp` i dodajemy odpowiednią liczbę dni
      const newDate = new Date(temp);
      newDate.setDate(temp.getDate() + i); // Przesuwamy datę o `i` dni
      return newDate;
    });
    
    setFullWeekend(arr)
  }
  function fillTable(data){
    let tab=new Array(7)
    //console.log(tab)
    for(let i=0;i<7;i++){
      tab[i]=new Array(14);
    }
    //console.log(tab)
    //console.log(data)
    data.forEach((event)=>{
      //console.log(event.Date.toDate())
      const date=event.Date.toDate()
      const day=(date.getDay()+ 6) % 7
      //console.log(day)
      const hour=date.getHours()-8;

      //console.log(hour)
      tab[day][hour]=event;
      //console.log(event)
      //console.log(tab)
    })
    //console.log(tab[1][3])
    setTableVal(tab)
  }
  
  return (
    <div className="flex flex-col items-center p-4 w-full">
      <h1 className="text-2xl font-bold mb-6">Weekly Schedule</h1>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            {/* Nagłówki dni */}
            <th className="border border-gray-300 bg-gray-100 bg-transparent border-transparent"></th>
            {fullWeekend.map((day) => (
              <th key={day.getDay()} className="border border-gray-300 bg-gray-200 text-center p-2">
                {days[(day.getDay() + 6) % 7]}<br />
                <span>{day.getDate()}.{day.getMonth() + 1}.{day.getFullYear()}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Siatka godzin i zajęć */}
          {hours.map((hour) => (
            <tr key={hour}>
              {/* Godziny */}
              <td className="border border-gray-300 bg-gray-100 text-center font-medium p-2">
                {hour}:00
              </td>

              {/* Pola dla każdego dnia */}
              {fullWeekend.map((day) => (
                <td
                  key={`${(day.getDay() + 6) % 7}-${hour}`}
                  className="border border-gray-300 p-2 text-sm cursor-pointer bg-gray-50 hover:bg-blue-100"
                  onClick={() =>
                    setSelectedEvent({
                      day,
                      hour,
                      event: tableVal[day.getDay()+6%7]?.[hour-8] || "",
                    })
                  }
                >
                  {tableVal[((day.getDay() + 6) % 7)]?.[hour-8]?.Title || ``}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>


      {/* Formularz edycji */}
      {selectedEvent && (
        <EventForm
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
          onSave={handleEventUpdate}
        />
      )}
    </div>
  );
};

const EventForm = ({ event, onClose, onSave }) => {
  const [value, setValue] = useState(event.event);
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg w-80">
        <h2 className="text-lg font-semibold mb-4">
          {event.event ? "Edit Event" : "Add Event"} - {event.day.getDay()} {event.hour}:00
        </h2>
        <textarea
          className="w-full p-2 border rounded mb-4"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter event details"
        />
        <div className="flex justify-between">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={() => {
              onSave(event.day, event.hour, null); // Usuwanie
              onClose();
            }}
          >
            Delete
          </button>
          <div>
            <button
              className="bg-gray-300 text-black px-4 py-2 rounded mr-2"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => {
                
                onSave(event.day, event.hour, value,event); // Zapisanie/edycja
                onClose();
              }}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeekSchedule;
