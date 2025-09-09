import { useEffect, useState } from "react";
import { getMyCreatedSlots, deleteInterview, updateInterview } from "../../api/interviewApi";
import { useTheme } from "../../context/ThemeProvider";

export default function MySlots() {
  const [slots, setSlots] = useState([]);
  const { darkMode } = useTheme();

  useEffect(() => {
    const fetchSlots = async () => {
      const res = await getMyCreatedSlots();
      setSlots(res.data);
    };
    fetchSlots();
  }, []);

  return (
    <div className={`p-6 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-50"}`}>
      <h1 className="text-2xl font-bold mb-4">📌 My Created Interview Slots</h1>
      {slots.map((slot) => (
        <div key={slot._id} className={`p-4 rounded-lg shadow mb-4 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
          <h2 className="text-xl">{slot.role} @ {slot.company}</h2>
          <p>📅 {slot.date} ⏰ {slot.time}</p>
          <p>🌐 {slot.mode}</p>
          <p>Status: {slot.status}</p>
          {slot.bookedBy && (
            <p>🎓 Booked By: {slot.bookedBy.name} ({slot.bookedBy.email})</p>
          )}
          {slot.status === "Filled" && slot.meetingLink && (
  <a
    href={slot.meetingLink}
    target="_blank"
    rel="noopener noreferrer"
    className="mt-4 block px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white font-bold rounded-lg text-center"
  >
    Join Meeting
  </a>
)}

        </div>
      ))}
    </div>
  );
}
