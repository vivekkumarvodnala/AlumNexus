// src/components/AnalyticsDashboard.jsx
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import {
  FaUserGraduate,
  FaUsers,
  FaMicrophone,
  FaBriefcase,
  FaChartLine,
  FaClock,
  FaFileAlt,
} from "react-icons/fa";
import { useTheme } from "../../context/ThemeProvider"; // theme path

// Mock analytics data
const chartData = [
  { month: "Jan", interviews: 15, jobs: 3 },
  { month: "Feb", interviews: 25, jobs: 5 },
  { month: "Mar", interviews: 40, jobs: 7 },
  { month: "Apr", interviews: 30, jobs: 4 },
  { month: "May", interviews: 50, jobs: 10 },
];

export default function AnalyticsDashboard() {
  const { darkMode } = useTheme();

  // Theme-dependent classes
  const bgClass = darkMode ? "bg-gray-800" : "bg-white";
  const textClass = darkMode ? "text-gray-100" : "text-gray-900";
  const subTextClass = darkMode ? "text-gray-300" : "text-gray-600";
  const borderClass = darkMode ? "border-gray-700" : "border-gray-100";
  const gridStroke = darkMode ? "#4B5563" : "#E5E7EB"; // Cartesian grid color
  const axisColor = darkMode ? "#D1D5DB" : "#1F2937"; // X/Y axis

  return (
    <div className={`p-6 min-h-screen transition-colors duration-500 ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      {/* Header */}
      <header className="mb-10">
        <h1 className={`text-3xl md:text-4xl font-extrabold flex items-center gap-2 ${textClass}`}>
          <FaChartLine className="text-primary" />
          AlumNexus Analytics Dashboard
        </h1>
        <p className={`mt-1 text-sm md:text-base ${subTextClass}`}>
          Insights into alumni engagement and student career activities
        </p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-gradient-to-r from-primary to-teal-500 text-white rounded-2xl shadow-xl p-6 flex items-center justify-between transform hover:scale-105 transition duration-300">
          <div>
            <p className="text-sm opacity-90">Total Alumni</p>
            <p className="text-3xl font-bold">1,245</p>
          </div>
          <FaUserGraduate className="w-10 h-10 opacity-90" />
        </div>

        <div className="bg-gradient-to-r from-secondary to-purple-600 text-white rounded-2xl shadow-xl p-6 flex items-center justify-between transform hover:scale-105 transition duration-300">
          <div>
            <p className="text-sm opacity-90">Registered Students</p>
            <p className="text-3xl font-bold">3,420</p>
          </div>
          <FaUsers className="w-10 h-10 opacity-90" />
        </div>

        <div className="bg-gradient-to-r from-primary to-emerald-600 text-white rounded-2xl shadow-xl p-6 flex items-center justify-between transform hover:scale-105 transition duration-300">
          <div>
            <p className="text-sm opacity-90">Mock Interviews</p>
            <p className="text-3xl font-bold">356</p>
          </div>
          <FaMicrophone className="w-10 h-10 opacity-90" />
        </div>

        <div className="bg-gradient-to-r from-secondary to-indigo-600 text-white rounded-2xl shadow-xl p-6 flex items-center justify-between transform hover:scale-105 transition duration-300">
          <div>
            <p className="text-sm opacity-90">Job Postings</p>
            <p className="text-3xl font-bold">89</p>
          </div>
          <FaBriefcase className="w-10 h-10 opacity-90" />
        </div>
      </div>

      {/* Chart Section */}
      <div className={`rounded-2xl shadow-lg mb-10 p-6 border ${borderClass} ${bgClass}`}>
        <h2 className={`text-xl font-semibold mb-4 flex items-center gap-2 ${textClass}`}>
          <FaChartLine className="text-secondary" />
          Engagement Trends
        </h2>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
            <XAxis dataKey="month" stroke={axisColor} />
            <YAxis stroke={axisColor} />
            <Tooltip
              contentStyle={{
                backgroundColor: darkMode ? "#1F2937" : "#fff",
                color: darkMode ? "#F3F4F6" : "#111827",
                borderRadius: "12px",
                border: `1px solid ${darkMode ? "#4B5563" : "#E5E7EB"}`,
              }}
            />
            <Line type="monotone" dataKey="interviews" stroke="#0D9488" strokeWidth={3} dot={{ fill: "#0D9488" }} />
            <Line type="monotone" dataKey="jobs" stroke="#8B5CF6" strokeWidth={3} dot={{ fill: "#8B5CF6" }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Activity */}
      <div className={`rounded-2xl shadow-lg p-6 border ${borderClass} ${bgClass}`}>
        <h2 className={`text-xl font-semibold mb-4 flex items-center gap-2 ${textClass}`}>
          <FaFileAlt className="text-primary" />
          Recent Alumni Activities
        </h2>
        <ul className="space-y-5">
          <li className="flex justify-between items-center">
            <span className={`font-medium flex items-center gap-2 ${textClass}`}>
              <FaMicrophone className="text-primary" /> Nithin hosted a Mock Interview
            </span>
            <span className={`text-sm flex items-center gap-1 ${subTextClass}`}>
              <FaClock /> 2h ago
            </span>
          </li>
          <li className="flex justify-between items-center">
            <span className={`font-medium flex items-center gap-2 ${textClass}`}>
              <FaFileAlt className="text-secondary" /> Vivek shared Interview Prep Notes
            </span>
            <span className={`text-sm flex items-center gap-1 ${subTextClass}`}>
              <FaClock /> 5h ago
            </span>
          </li>
          <li className="flex justify-between items-center">
            <span className={`font-medium flex items-center gap-2 ${textClass}`}>
              <FaBriefcase className="text-primary" /> Balaji posted a new Job Referral
            </span>
            <span className={`text-sm flex items-center gap-1 ${subTextClass}`}>
              <FaClock /> 1d ago
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
