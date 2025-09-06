// src/components/ContentModeration.jsx
import React, { useState } from "react";
import { FaCheckCircle, FaTimesCircle, FaExclamationCircle, FaSearch } from "react-icons/fa";
import { useTheme } from "../../context/ThemeProvider"; // theme path

const mockContent = [
  { id: 1, user: "Nithin", type: "Post", text: "Sharing interview prep tips!", status: "approved" },
  { id: 2, user: "Vivek", type: "Comment", text: "This content seems spammy.", status: "pending" },
  { id: 3, user: "Balaji", type: "Post", text: "New job referral posted.", status: "rejected" },
  { id: 4, user: "Sakarwal", type: "Comment", text: "Great insights from alumni podcast.", status: "approved" },
];

export default function ContentModeration() {
  const { darkMode } = useTheme();
  const [search, setSearch] = useState("");

  const themeClasses = darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900";
  const borderClasses = darkMode ? "border-gray-700" : "border-gray-200";
  const inputBg = darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900";

  const filteredContent = mockContent.filter(
    (c) =>
      c.user.toLowerCase().includes(search.toLowerCase()) ||
      c.text.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusIcon = (status) => {
    switch (status) {
      case "approved":
        return <FaCheckCircle className="text-green-500 w-5 h-5" />;
      case "rejected":
        return <FaTimesCircle className="text-red-500 w-5 h-5" />;
      default:
        return <FaExclamationCircle className="text-yellow-500 w-5 h-5" />;
    }
  };

  return (
    <div className={`p-6 min-h-screen transition-colors duration-500 ${themeClasses}`}>
      {/* Header */}
      <header className="mb-8 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <h1 className={`text-3xl md:text-4xl font-extrabold flex items-center gap-2`}>
          <FaExclamationCircle className="text-primary" />
          Content Moderation
        </h1>
        <div className="relative md:w-1/3 w-full">
          <FaSearch className="absolute top-2 left-2 text-gray-400" />
          <input
            type="text"
            placeholder="Search content..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`pl-8 pr-4 py-2 rounded-lg border ${borderClasses} focus:outline-none focus:ring-2 focus:ring-primary transition w-full ${inputBg}`}
          />
        </div>
      </header>

      {/* Content List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredContent.length === 0 ? (
          <p className={`text-center col-span-full ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
            No content found.
          </p>
        ) : (
          filteredContent.map((content) => (
            <div
              key={content.id}
              className={`p-6 rounded-2xl shadow-md border ${borderClasses} ${darkMode ? "bg-gray-800" : "bg-white"} transition hover:shadow-lg`}
            >
              <div className="flex justify-between items-start mb-2">
                <span className="font-bold text-primary">{content.user}</span>
                {getStatusIcon(content.status)}
              </div>
              <p className={`${darkMode ? "text-gray-100" : "text-gray-700"} mb-4`}>
                {content.text}
              </p>
              <div className="flex gap-2">
                <button className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition flex-1">
                  Approve
                </button>
                <button className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition flex-1">
                  Reject
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
