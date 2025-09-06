// Alumni/Dashboard.jsx
import React from "react";
import {
  FaUserGraduate,
  FaRegLightbulb,
  FaMicrophoneAlt,
  FaBookOpen,
  FaUsers,
  FaGift,
} from "react-icons/fa";

export default function AlumniDashboard() {
  const cards = [
    {
      title: "Manage Profile",
      icon: <FaUserGraduate />,
      accent: "text-[#0D9488]",
    }, // Teal
    {
      title: "Post Referral",
      icon: <FaRegLightbulb />,
      accent: "text-[#8B5CF6]",
    }, // Violet
    {
      title: "Share Experience",
      icon: <FaMicrophoneAlt />,
      accent: "text-[#0D9488]",
    },
    { title: "Share Story", icon: <FaBookOpen />, accent: "text-[#8B5CF6]" },
    { title: "Upload Resource", icon: <FaUsers />, accent: "text-[#0D9488]" },
    { title: "Write Review", icon: <FaGift />, accent: "text-[#8B5CF6]" },
  ];

  return (
    <div
      className={`p-6 rounded-2xl border transition-colors duration-300 
        bg-[#F9FAFB] text-[#1F2937] border-gray-200 
        dark:bg-[#1F2937] dark:text-gray-100 dark:border-gray-700`}
    >
      <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
        🎓{" "}
        <span className="text-[#0D9488] dark:text-[#8B5CF6]">
          Alumni Dashboard
        </span>
      </h2>
      <p className="mb-6 text-gray-600 dark:text-gray-400">
        Quick access to alumni actions and sharing tools.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className={`p-6 rounded-xl flex flex-col items-center justify-center gap-3 
        transition hover:scale-105 cursor-pointer 
        bg-white dark:bg-gray-800 shadow-lg dark:shadow-xl`}
          >
            <div className={`text-3xl ${card.accent}`}>{card.icon}</div>
            <p className="font-medium">{card.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
