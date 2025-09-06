// src/components/Dashboard.jsx
import React from "react";
import AnalyticsDashboard from "./AnalyticsDashboard";
import ContentModeration from "./ContentModeration";
import { FaChartLine, FaExclamationCircle, FaUserGraduate, FaUsers } from "react-icons/fa";
import { useTheme } from "../../context/ThemeProvider"; // updated path

// Theme Toggle Component
const ThemeToggle = () => {
  const { darkMode, setDarkMode } = useTheme();
  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-teal-700 transition"
    >
      {darkMode ? "Light Mode" : "Dark Mode"}
    </button>
  );
};

// Quick Stats Card
const StatCard = ({ title, value, icon, gradient }) => (
  <div
    className={`bg-gradient-to-r ${gradient} text-white rounded-2xl shadow-xl p-6 flex items-center justify-between transform hover:scale-105 transition duration-300`}
  >
    <div>
      <p className="text-sm opacity-90">{title}</p>
      <p className="text-3xl font-bold">{value}</p>
    </div>
    {icon}
  </div>
);

export default function AdminDashboard() {
  const { darkMode } = useTheme();

  const themeClasses = darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900";

  const stats = [
    { title: "Total Alumni", value: "1,245", icon: <FaUserGraduate className="w-10 h-10 opacity-90" />, gradient: "from-primary to-teal-500" },
    { title: "Registered Students", value: "3,420", icon: <FaUsers className="w-10 h-10 opacity-90" />, gradient: "from-secondary to-purple-600" },
    { title: "Analytics Reports", value: "5", icon: <FaChartLine className="w-10 h-10 opacity-90" />, gradient: "from-primary to-emerald-600" },
    { title: "Moderation Tasks", value: "12", icon: <FaExclamationCircle className="w-10 h-10 opacity-90" />, gradient: "from-secondary to-indigo-600" },
  ];

  const cardBg = darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200";
  const cardText = darkMode ? "text-gray-100" : "text-gray-700";

  return (
    <div className={`p-6 min-h-screen transition-colors duration-500 ${themeClasses}`}>
      {/* Header */}
      <header className="mb-10 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <h1 className="text-3xl md:text-4xl font-extrabold flex items-center gap-2">
          <FaChartLine className="text-primary" />
          AlumNexus Dashboard
        </h1>
        <ThemeToggle />
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
          />
        ))}
      </div>

      {/* Analytics Section */}
      <div className="mb-10">
        <AnalyticsDashboard />
      </div>

      {/* Content Moderation Section */}
      <div className="mb-10">
        <ContentModeration />
      </div>

      {/* Optional Additional Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <div className={`p-6 rounded-2xl shadow-md border transition-colors duration-500 ${cardBg}`}>
          <h3 className={`text-xl font-bold text-primary mb-2`}>Upcoming Events</h3>
          <p className={`${cardText}`}>
            Alumni meetups, webinars, and workshops scheduled for this month.
          </p>
        </div>
        <div className={`p-6 rounded-2xl shadow-md border transition-colors duration-500 ${cardBg}`}>
          <h3 className={`text-xl font-bold text-primary mb-2`}>New Resources</h3>
          <p className={`${cardText}`}>
            Interview prep notes, practice questions, and mentorship guidelines shared by alumni.
          </p>
        </div>
      </div>
    </div>
  );
}
