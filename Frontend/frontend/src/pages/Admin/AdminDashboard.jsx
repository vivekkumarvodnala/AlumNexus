// src/components/Dashboard.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaChartLine,
  FaExclamationCircle,
  FaUserGraduate,
  FaUsers,
  FaFileUpload,
  FaCalendarAlt,
} from "react-icons/fa";
import { useTheme } from "../../context/ThemeProvider";

const StatCard = ({ title, value, icon, gradient, darkMode }) => (
  <div
    className={`rounded-2xl shadow-xl p-6 flex items-center justify-between transform transition duration-300 border cursor-pointer hover:scale-105`}
    style={{ background: gradient }}
  >
    <div>
      <p
        className={`text-sm opacity-90 ${
          darkMode ? "text-white/80" : "text-[#1F2937]"
        }`}
      >
        {title}
      </p>
      <p
        className={`text-3xl font-bold ${
          darkMode ? "text-white" : "text-[#1F2937]"
        }`}
      >
        {value}
      </p>
    </div>
    <div
      className={`text-4xl ${
        darkMode
          ? "text-yellow-400 transition-colors duration-300 hover:text-yellow-300"
          : "text-[#0D9488] transition-colors duration-300 hover:text-[#8B5CF6]"
      }`}
    >
      {icon}
    </div>
  </div>
);

export default function AdminDashboard() {
  const { darkMode } = useTheme();

  const themeBg = darkMode ? "bg-gray-900" : "bg-[#F9FAFB]";
  const themeText = darkMode ? "text-white" : "text-[#1F2937]";

  const [stats, setStats] = useState([
    {
      title: "Total Alumni",
      value: "0",
      icon: <FaUserGraduate />,
      gradient: darkMode
        ? "linear-gradient(90deg,#44403C,#6B21A8)"
        : "linear-gradient(90deg,#0D9488,#14B8A6)",
    },
    {
      title: "Registered Students",
      value: "0",
      icon: <FaUsers />,
      gradient: darkMode
        ? "linear-gradient(90deg,#78350F,#CA8A04)"
        : "linear-gradient(90deg,#8B5CF6,#C084FC)",
    },
    {
      title: "Analytics Reports",
      value: "0",
      icon: <FaChartLine />,
      gradient: darkMode
        ? "linear-gradient(90deg,#5B21B6,#FACC15)"
        : "linear-gradient(90deg,#0D9488,#059669)",
    },
    {
      title: "Moderation Tasks",
      value: "0",
      icon: <FaExclamationCircle />,
      gradient: darkMode
        ? "linear-gradient(90deg,#78350F,#FBBF24)"
        : "linear-gradient(90deg,#8B5CF6,#7C3AED)",
    },
  ]);

  const events = [
    { title: "Alumni Meetup", content: "Scheduled for 25th September" },
    { title: "Webinar on AI", content: "Join on 30th September" },
  ];

  const resources = [
    { title: "Interview Prep Notes", content: "Shared by senior alumni" },
    { title: "Project Repository", content: "Full-stack projects uploaded" },
  ];

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get("/api/stats"); // Replace with your API
        const data = response.data;

        setStats([
          { ...stats[0], value: data.totalAlumni || stats[0].value },
          { ...stats[1], value: data.registeredStudents || stats[1].value },
          { ...stats[2], value: data.analyticsReports || stats[2].value },
          { ...stats[3], value: data.moderationTasks || stats[3].value },
        ]);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []); // Run once on mount

  return (
    <div className={`${themeBg} ${themeText} p-6 min-h-screen transition-colors duration-500`}>
      {/* Header */}
      <header className="mb-10 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <h1 className="text-3xl md:text-4xl font-extrabold flex items-center gap-2">
          <FaChartLine
            className={darkMode ? "text-yellow-400" : "text-[#0D9488]"}
          />{" "}
          Admin Dashboard
        </h1>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, i) => (
          <StatCard
            key={i}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            gradient={stat.gradient}
            darkMode={darkMode}
          />
        ))}
      </div>

      {/* Events & Resources */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.map((event, i) => (
          <div
            key={i}
            className={`p-6 rounded-2xl shadow-md border transition-colors duration-300 cursor-pointer ${
              darkMode
                ? "bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
                : "bg-white border-gray-200 text-[#1F2937] hover:bg-[#E0F2F1]"
            }`}
          >
            <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
              <FaCalendarAlt /> {event.title}
            </h3>
            <p>{event.content}</p>
          </div>
        ))}

        {resources.map((res, i) => (
          <div
            key={i}
            className={`p-6 rounded-2xl shadow-md border transition-colors duration-300 cursor-pointer ${
              darkMode
                ? "bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
                : "bg-white border-gray-200 text-[#1F2937] hover:bg-[#E0F2F1]"
            }`}
          >
            <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
              <FaFileUpload /> {res.title}
            </h3>
            <p>{res.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
