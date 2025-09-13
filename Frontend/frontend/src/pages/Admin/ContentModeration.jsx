// src/components/ContentModeration.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaExclamationCircle, FaSearch } from "react-icons/fa";
import { useTheme } from "../../context/ThemeProvider";

export default function ContentModeration() {
  const { darkMode } = useTheme();
  const [search, setSearch] = useState("");
  const [contentList, setContentList] = useState([]);
  const [updatingId, setUpdatingId] = useState(null);

  // 👉 Replace with your actual MockAPI endpoint for `content`
  const API_BASE = "https://YOUR_REAL_MOCKAPI_URL/api/v1/content";

  const themeClasses = darkMode
    ? "bg-gray-900 text-white"
    : "bg-gray-50 text-gray-900";
  const inputBg = darkMode
    ? "bg-gray-800 text-white placeholder-gray-400"
    : "bg-white text-gray-900 placeholder-gray-400";

  // Fetch content on mount
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await axios.get(API_BASE);
        setContentList(response.data);
      } catch (error) {
        console.error("Error fetching content:", error);
        // fallback mock data
        setContentList([
          { id: 1, user: "Nithin", type: "Post", text: "Sharing interview prep tips!", status: "approved" },
          { id: 2, user: "Vivek", type: "Comment", text: "This content seems spammy.", status: "pending" },
          { id: 3, user: "Balaji", type: "Post", text: "New job referral posted.", status: "rejected" },
          { id: 4, user: "Sakarwal", type: "Comment", text: "Great insights from alumni podcast.", status: "approved" },
        ]);
      }
    };
    fetchContent();
  }, [API_BASE]);

  const filteredContent = contentList.filter(
    (c) =>
      c.user.toLowerCase().includes(search.toLowerCase()) ||
      c.text.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusBadge = (status) => {
    switch (status) {
      case "approved":
        return (
          <span className="px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-700 dark:bg-yellow-400 dark:text-gray-900">
            Approved
          </span>
        );
      case "rejected":
        return (
          <span className="px-3 py-1 rounded-full text-sm font-semibold bg-red-100 text-red-700 dark:bg-red-500 dark:text-white">
            Rejected
          </span>
        );
      default:
        return (
          <span className="px-3 py-1 rounded-full text-sm font-semibold bg-yellow-100 text-yellow-700 dark:bg-yellow-300 dark:text-gray-900">
            Pending
          </span>
        );
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    setUpdatingId(id);
    try {
      const content = contentList.find((c) => String(c.id) === String(id));
      const resp = await axios.put(`${API_BASE}/${id}`, {
        ...content,
        status: newStatus,
      });

      setContentList((prev) =>
        prev.map((c) =>
          String(c.id) === String(id) ? resp.data : c
        )
      );
    } catch (error) {
      console.error("Error updating content:", error);
      alert("❌ Failed to update status. Check if API_BASE is correct.");
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className={`p-8 min-h-screen transition-colors duration-500 ${themeClasses}`}>
      {/* Header */}
      <header className="mb-10 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <h1 className="text-3xl md:text-4xl font-extrabold flex items-center gap-3">
          <FaExclamationCircle
            className={`${darkMode ? "text-yellow-400" : "text-teal-600"} w-8 h-8`}
          />
          Content Moderation
        </h1>
        <div className="relative md:w-1/3 w-full">
          <FaSearch className="absolute top-3 left-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search content..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`pl-10 pr-4 py-3 rounded-2xl border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-600 dark:focus:ring-yellow-400 transition w-full ${inputBg}`}
          />
        </div>
      </header>

      {/* Content List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredContent.length === 0 ? (
          <p className={`text-center col-span-full ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
            No content found.
          </p>
        ) : (
          filteredContent.map((content) => (
            <div
              key={content.id}
              className={`p-6 rounded-3xl shadow-md border border-gray-200 dark:border-gray-700 transition-transform transform hover:scale-105 hover:shadow-xl 
              ${darkMode ? "bg-gray-800 hover:bg-yellow-300/10" : "bg-white hover:bg-teal-50"}`}
            >
              <div className="flex justify-between items-start mb-4">
                <span className={`font-semibold text-lg ${darkMode ? "text-yellow-400" : "text-teal-600"}`}>
                  {content.user}
                </span>
                {getStatusBadge(content.status)}
              </div>
              <p className={`${darkMode ? "text-gray-100" : "text-gray-700"} mb-6`}>
                {content.text}
              </p>
              <div className="flex gap-3">
                <button
                  disabled={updatingId === content.id}
                  onClick={() => handleStatusChange(content.id, "approved")}
                  className={`flex-1 px-4 py-2 rounded-xl font-medium transition shadow-sm
                    ${darkMode
                      ? "bg-yellow-400 text-gray-900 hover:bg-yellow-300"
                      : "bg-teal-600 text-white hover:bg-teal-500"
                    } disabled:opacity-60`}
                >
                  {updatingId === content.id ? "Updating..." : "Approve"}
                </button>
                <button
                  disabled={updatingId === content.id}
                  onClick={() => handleStatusChange(content.id, "rejected")}
                  className={`flex-1 px-4 py-2 rounded-xl font-medium transition shadow-sm
                    ${darkMode
                      ? "bg-red-500 text-white hover:bg-red-400"
                      : "bg-purple-500 text-white hover:bg-purple-400"
                    } disabled:opacity-60`}
                >
                  {updatingId === content.id ? "Updating..." : "Reject"}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
