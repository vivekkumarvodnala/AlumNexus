// Alumni/Dashboard.jsx
import React, { useEffect, useState } from "react";
import {
  FaUserGraduate,
  FaRegLightbulb,
  FaMicrophoneAlt,
  FaBookOpen,
  FaUsers,
  FaGift,
} from "react-icons/fa";
import { motion } from "framer-motion";
import axios from "axios";

export default function AlumniDashboard() {
  const [stats, setStats] = useState({
    profileViews: 0,
    referrals: 0,
    experiences: 0,
    stories: 0,
    resources: 0,
    reviews: 0,
  });

  const cards = [
    { title: "Manage Profile", icon: <FaUserGraduate />, key: "profileViews" },
    { title: "Post Referral", icon: <FaRegLightbulb />, key: "referrals" },
    { title: "Share Review", icon: <FaMicrophoneAlt />, key: "experiences" },
    { title: "Share Story", icon: <FaBookOpen />, key: "stories" },
    { title: "Upload Resource", icon: <FaUsers />, key: "resources" },
    { title: "Write Review", icon: <FaGift />, key: "reviews" },
  ];

  // ✅ Fetch dashboard stats
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await axios.get("/api/alumni/dashboard"); // backend endpoint
        setStats(data);
      } catch (err) {
        console.error("Error fetching dashboard stats:", err);
      }
    };
    fetchStats();
  }, []);

  return (
    <motion.div
      className={`p-8 rounded-3xl border transition-colors duration-300 
        bg-[#F9FAFB] text-[#1F2937] border-gray-200 
        dark:bg-gray-900 dark:text-white dark:border-gray-700 shadow-2xl`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold flex items-center gap-2">
          🎓
          <span className="text-[#0D9488] dark:text-yellow-400">
            Alumni Dashboard
          </span>
        </h2>
        <span className="px-3 py-1 text-sm rounded-full bg-[#0D9488]/10 text-[#0D9488] dark:bg-yellow-400/10 dark:text-yellow-400 font-medium">
          Welcome Back!
        </span>
      </div>

      <p className="mb-8 text-gray-600 dark:text-gray-300">
        Quick access to alumni features and engagement tools.
      </p>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {cards.map((card, idx) => (
          <motion.div
            key={idx}
            className={`p-6 rounded-2xl flex flex-col items-center justify-center gap-3 
              transition cursor-pointer select-none
              bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl 
              border border-gray-200 dark:border-gray-700`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            {/* Icon */}
            <div
              className={`text-4xl text-[#0D9488] dark:text-yellow-400 hover:text-[#8B5CF6] dark:hover:text-yellow-300 transition-colors`}
            >
              {card.icon}
            </div>

            {/* Title */}
            <p className="font-semibold text-lg">{card.title}</p>

            {/* Stats */}
            <span className="text-sm text-gray-500 dark:text-gray-300">
              {stats[card.key] ?? 0} actions
            </span>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-10 text-center text-sm text-gray-500 dark:text-gray-400">
        Powered by{" "}
        <span className="font-semibold text-[#0D9488] dark:text-yellow-400">
          AlumniConnect
        </span>
      </div>
    </motion.div>
  );
}
