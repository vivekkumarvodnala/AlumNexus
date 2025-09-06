// src/pages/Student/MockInterviewScheduler.jsx
import React, { useState } from "react";
import { Calendar, Clock } from "lucide-react";

export default function MockInterviewScheduler() {
  // Dummy slots
  const slots = [
    { id: 1, date: "2025-09-10", time: "10:00 AM", alumnus: "Ravi Kumar" },
    { id: 2, date: "2025-09-11", time: "2:00 PM", alumnus: "Anjali Sharma" },
    { id: 3, date: "2025-09-12", time: "6:00 PM", alumnus: "Pranav Reddy" },
  ];

  const [booked, setBooked] = useState(null);

  const handleBook = (slot) => {
    setBooked(slot.id);
  };

  return (
    <div className="min-h-screen bg-bg dark:bg-accent px-6 py-8">
      <h1 className="text-2xl font-bold text-accent dark:text-gray-100 mb-6">
        Mock Interview Scheduler
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {slots.map((slot) => (
          <div
            key={slot.id}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm p-5 hover:shadow-md transition"
          >
            {/* Date & Time */}
            <div className="flex items-center gap-2 text-primary mb-2">
              <Calendar className="w-5 h-5" />
              <span className="font-medium">{slot.date}</span>
            </div>
            <div className="flex items-center gap-2 text-secondary mb-3">
              <Clock className="w-5 h-5" />
              <span>{slot.time}</span>
            </div>

            {/* Alumnus */}
            <p className="text-sm text-accent dark:text-gray-300 mb-4">
              With <span className="font-semibold">{slot.alumnus}</span>
            </p>

            {/* Book Button */}
            <button
              onClick={() => handleBook(slot)}
              disabled={booked === slot.id}
              className={`w-full py-2 rounded-lg text-sm font-medium transition ${
                booked === slot.id
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-primary text-white hover:bg-teal-700"
              }`}
            >
              {booked === slot.id ? "Booked ✅" : "Book Now"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
