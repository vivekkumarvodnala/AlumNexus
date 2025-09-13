// src/components/AnalyticsDashboard.jsx
import React, { useState, useEffect } from "react";
import axios from "axios"; // Axios for dynamic data
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
import { useTheme } from "../../context/ThemeProvider";

export default function AnalyticsDashboard() {
  const { darkMode } = useTheme();

  const [chartData, setChartData] = useState([]);
  const [statCards, setStatCards] = useState([]);

  const bgClass = darkMode ? "bg-gray-900" : "bg-[#F9FAFB]";
  const textClass = darkMode ? "text-white" : "text-[#1F2937]";
  const subTextClass = darkMode ? "text-gray-300" : "text-gray-600";
  const borderClass = darkMode ? "border-gray-700" : "border-gray-200";
  const gridStroke = darkMode ? "#4B5563" : "#E5E7EB"; 
  const axisColor = darkMode ? "#D1D5DB" : "#1F2937"; 

  const fallbackChartData = [
    { month: "Jan", interviews: 15, jobs: 3 },
    { month: "Feb", interviews: 25, jobs: 5 },
    { month: "Mar", interviews: 40, jobs: 7 },
    { month: "Apr", interviews: 30, jobs: 4 },
    { month: "May", interviews: 50, jobs: 10 },
  ];

  const fallbackStatCards = [
    {
      title: "Total Alumni",
      value: "1,245",
      icon: <FaUserGraduate />,
      gradient: darkMode ? "linear-gradient(135deg,#374151,#FBBF24)" : "linear-gradient(135deg,#0D9488,#14B8A6)",
    },
    {
      title: "Registered Students",
      value: "3,420",
      icon: <FaUsers />,
      gradient: darkMode ? "linear-gradient(135deg,#78350F,#FCD34D)" : "linear-gradient(135deg,#8B5CF6,#C084FC)",
    },
    {
      title: "Mock Interviews",
      value: "356",
      icon: <FaMicrophone />,
      gradient: darkMode ? "linear-gradient(135deg,#1E40AF,#FACC15)" : "linear-gradient(135deg,#0D9488,#059669)",
    },
    {
      title: "Job Postings",
      value: "89",
      icon: <FaBriefcase />,
      gradient: darkMode ? "linear-gradient(135deg,#7C2D12,#FBBF24)" : "linear-gradient(135deg,#8B5CF6,#7C3AED)",
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const chartRes = await axios.get("/api/chart").catch(() => ({ data: [] }));
        const statsRes = await axios.get("/api/stats").catch(() => ({ data: [] }));

        setChartData(chartRes.data.length ? chartRes.data : fallbackChartData);
        setStatCards(statsRes.data.length ? statsRes.data.map((card, i) => ({
          ...card,
          gradient: fallbackStatCards[i].gradient,
          icon: fallbackStatCards[i].icon
        })) : fallbackStatCards);
      } catch (err) {
        console.error("Error fetching analytics data:", err);
        setChartData(fallbackChartData);
        setStatCards(fallbackStatCards);
      }
    };

    fetchData();
  }, [darkMode]);

  return (
    <div className={`p-6 min-h-screen transition-colors duration-500 ${bgClass}`}>
      {/* Header */}
      <header className="mb-10">
        <h1 className={`text-3xl md:text-4xl font-extrabold flex items-center gap-2 ${textClass}`}>
          <FaChartLine className={darkMode ? "text-yellow-400" : "text-[#0D9488]"} />
          AlumNexus Analytics
        </h1>
        <p className={`mt-1 text-sm md:text-base ${subTextClass}`}>
          Insights into alumni engagement and student career activities
        </p>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {statCards.map((card, i) => (
          <div
            key={i}
            className={`rounded-3xl shadow-2xl p-6 flex items-center justify-between transform transition-all duration-500 
              hover:scale-105 hover:shadow-xl hover:shadow-yellow-400/30`}
            style={{ background: card.gradient }}
          >
            <div>
              <p className="text-sm opacity-90 text-white">{card.title}</p>
              <p className="text-3xl font-bold text-white">{card.value}</p>
            </div>
            <div className="text-4xl text-white opacity-90">{card.icon}</div>
          </div>
        ))}
      </div>

      {/* Engagement Chart */}
      <div className={`rounded-3xl shadow-lg p-6 border ${borderClass} ${darkMode ? "bg-gray-800" : "bg-white"}`}>
        <h2 className={`text-xl font-semibold mb-4 flex items-center gap-2 ${textClass}`}>
          <FaChartLine className={darkMode ? "text-yellow-400" : "text-[#0D9488]"} />
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
            <Line
              type="monotone"
              dataKey="interviews"
              stroke={darkMode ? "#FBBF24" : "#0D9488"}
              strokeWidth={3}
              dot={{ fill: darkMode ? "#FBBF24" : "#0D9488" }}
            />
            <Line
              type="monotone"
              dataKey="jobs"
              stroke={darkMode ? "#FACC15" : "#8B5CF6"}
              strokeWidth={3}
              dot={{ fill: darkMode ? "#FACC15" : "#8B5CF6" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Activity */}
      <div className={`rounded-3xl shadow-lg p-6 border ${borderClass} ${darkMode ? "bg-gray-800" : "bg-white"}`}>
        <h2 className={`text-xl font-semibold mb-4 flex items-center gap-2 ${textClass}`}>
          <FaFileAlt className={darkMode ? "text-yellow-400" : "text-[#0D9488]"} />
          Recent Alumni Activities
        </h2>
        <ul className="space-y-4">
          {[
            { name: "Nithin", action: "hosted a Mock Interview", icon: <FaMicrophone />, time: "2h ago" },
            { name: "Vivek", action: "shared Interview Prep Notes", icon: <FaFileAlt />, time: "5h ago" },
            { name: "Balaji", action: "posted a new Job Referral", icon: <FaBriefcase />, time: "1d ago" },
          ].map((item, i) => (
            <li
              key={i}
              className={`flex justify-between items-center p-4 rounded-xl transition-colors duration-300 
                hover:bg-opacity-10 ${darkMode ? "hover:bg-yellow-400/20" : "hover:bg-[#0D9488]/10"}`}
            >
              <span className={`font-medium flex items-center gap-2 ${textClass}`}>
                <span className="text-xl">{item.icon}</span> {item.name} {item.action}
              </span>
              <span className={`text-sm flex items-center gap-1 ${subTextClass}`}>
                <FaClock /> {item.time}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
