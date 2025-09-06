import { useEffect, useState } from "react";
import axios from "axios";
import { useTheme } from "../context/ThemeProvider";

export default function MockInterviews() {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const { darkMode } = useTheme();

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/interviews");
        setInterviews(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchInterviews();
  }, []);

  const bookInterview = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `http://localhost:5000/api/interviews/${id}/book`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Interview booked successfully!");
      window.location.reload();
    } catch (err) {
      alert(err.response?.data?.message || "Error booking interview");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div
      className={`min-h-screen p-6 ${
        darkMode ? "bg-gray-900 text-white" : "bg-background text-accent"
      }`}
    >
      <h1 className="text-2xl font-heading font-bold mb-6">
        🎯 Available Mock Interview Slots
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {interviews.map((slot) => (
          <div
            key={slot._id}
            className={`rounded-2xl shadow-lg p-5 transition ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <h2 className="text-xl font-semibold text-primary">
              {slot.role} @ {slot.company}
            </h2>
            <p className="mt-2">👨‍🏫 Alumni: {slot.alumni}</p>
            <p>📅 {slot.date} - ⏰ {slot.time}</p>
            <p>🌐 Mode: {slot.mode}</p>
            <p
              className={`mt-2 font-bold ${
                slot.status === "Filled" ? "text-red-500" : "text-green-500"
              }`}
            >
              {slot.status}
            </p>

            {slot.status === "Open" && (
              <button
                onClick={() => bookInterview(slot._id)}
                className="mt-4 w-full px-4 py-2 bg-secondary hover:bg-violet-400 text-white font-bold rounded-lg"
              >
                Book Slot
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
