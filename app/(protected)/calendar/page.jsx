'use client'
import React from "react";
import { useState } from "react";

import { useSearchParams } from 'next/navigation'

const WeekSchedule = () => {
  const hours = Array.from({ length: 14 }, (_, i) => i + 8); // Godziny od 8:00 do 19:00
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  const [schedule, setSchedule] = useState({});
  const [selectedEvent, setSelectedEvent] = useState(null);

  const searchParams = useSearchParams()
  console.log(searchParams.get('data')) // Logs "search"

  // Funkcja do zarządzania zajęciami
  const handleEventUpdate = (day, hour, event) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [hour]: event,
      },
    }));
    setSelectedEvent(null);
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-6">Weekly Schedule</h1>
      <div className="grid grid-cols-8 gap-0 w-full">
        {/* Nagłówki dni */}
        <div></div>
        {days.map((day) => (
          <div key={day} className="text-center font-semibold bg-gray-200 p-2">
            {day}
          </div>
        ))}

        {/* Siatka godzin i zajęć */}
        {hours.map((hour) => (
          <React.Fragment key={hour}>
            {/* Godziny */}
            <div className="text-center font-medium bg-gray-100 p-2">
              {hour}:00
            </div>

            {/* Pola dla każdego dnia */}
            {days.map((day) => (
              <div
                key={`${day}-${hour}`}
                className="border p-2 text-sm cursor-pointer bg-gray-50 hover:bg-blue-100"
                onClick={() =>
                  setSelectedEvent({ day, hour, event: schedule[day]?.[hour] || "" })
                }
              >
                {schedule[day]?.[hour] || ""}
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>

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
          {event.event ? "Edit Event" : "Add Event"} - {event.day} {event.hour}:00
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
                onSave(event.day, event.hour, value); // Zapisanie/edycja
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
