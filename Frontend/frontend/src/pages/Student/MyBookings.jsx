import { useEffect, useState } from "react";
import { getMyBookings } from "../../api/interviewApi";
import { useTheme } from "../../context/ThemeProvider";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const { darkMode } = useTheme();

  useEffect(() => {
    const fetchBookings = async () => {
      const res = await getMyBookings();
      setBookings(res.data);
    };
    fetchBookings();
  }, []);

  return (
    <div className={`p-6 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-50"}`}>
      <h1 className="text-2xl font-bold mb-4">🎯 My Booked Interviews</h1>
      {bookings.map((slot) => (
        <div key={slot._id} className={`p-4 rounded-lg shadow mb-4 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
          <h2 className="text-xl">{slot.role} @ {slot.company}</h2>
          <p>👨‍🏫 Alumni: {slot.alumni}</p>
          <p>📅 {slot.date} ⏰ {slot.time}</p>
          <p>🌐 {slot.mode}</p>
          <p>Status: {slot.status}</p>
          {slot.meetingLink && (
            <a
              href={slot.meetingLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2 px-4 py-2 bg-teal-500 text-white rounded-lg"
            >
              Join Meeting
            </a>
          )}
        </div>
      ))}
    </div>
  );
}
