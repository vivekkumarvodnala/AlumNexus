// src/pages/Admin/RoleConversionPage.jsx
import React, { useState } from "react";
import axios from "axios";
import { FaUserGraduate, FaUsers, FaExchangeAlt, FaSearch } from "react-icons/fa";
import { useTheme } from "../../context/ThemeProvider";

const mockUsers = [
  { id: 1, name: "Nithin", currentRole: "Student" },
  { id: 2, name: "Vivek", currentRole: "Student" },
  { id: 3, name: "Balaji", currentRole: "Alumni" },
];

export default function RoleConversionPage() {
  const { darkMode } = useTheme();
  const [users, setUsers] = useState(mockUsers);
  const [search, setSearch] = useState("");
  const [toastMessage, setToastMessage] = useState("");

  const themeClasses = darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900";
  const cardBg = darkMode ? "bg-gray-800" : "bg-white";
  const borderClasses = darkMode ? "border-gray-700" : "border-gray-200";

  const filteredUsers = users.filter(
    (u) => u.name.toLowerCase().includes(search.toLowerCase()) || u.currentRole.toLowerCase().includes(search.toLowerCase())
  );

  const getRoleBadge = (role) => {
    if (role === "Student") return <span className="px-3 py-1 rounded-full text-sm font-semibold bg-teal-600 text-white">{role}</span>;
    if (role === "Alumni") return <span className="px-3 py-1 rounded-full text-sm font-semibold bg-purple-500 text-white">{role}</span>;
    return <span className="px-3 py-1 rounded-full text-sm font-semibold bg-yellow-400 text-gray-900">{role}</span>;
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  // Convert a single user role
  const convertRole = async (id) => {
    const updatedUsers = users.map((user) => {
      if (user.id === id) {
        const newRole = user.currentRole === "Student" ? "Alumni" : user.currentRole === "Alumni" ? "Moderator" : "Alumni";
        return { ...user, currentRole: newRole };
      }
      return user;
    });

    setUsers(updatedUsers); // Update state first → stats recalc immediately

    const user = users.find((u) => u.id === id);
    const newRole = user.currentRole === "Student" ? "Alumni" : user.currentRole === "Alumni" ? "Moderator" : "Alumni";
    showToast(`${user.name} is now ${newRole}`);

    // Axios call
    try {
      await axios.patch(`https://jsonplaceholder.typicode.com/users/${id}`, { currentRole: newRole });
    } catch (err) {
      console.error(err);
      showToast("Failed to update role. Try again.");
    }
  };

  // Stats recalculated from state
  const stats = {
    Student: users.filter((u) => u.currentRole === "Student").length,
    Alumni: users.filter((u) => u.currentRole === "Alumni").length,
    Moderator: users.filter((u) => u.currentRole === "Moderator").length,
  };

  return (
    <div className={`min-h-screen p-8 transition-colors duration-500 ${themeClasses}`}>
      {toastMessage && (
        <div className="fixed top-5 right-5 bg-yellow-400 text-gray-900 px-5 py-3 rounded-lg shadow-lg animate-slide-in z-50">
          {toastMessage}
        </div>
      )}

      {/* Header */}
      <header className="mb-8 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-3">
          <FaExchangeAlt className={`${darkMode ? "text-yellow-400" : "text-teal-600"} w-8 h-8`} />
          Role Conversion Dashboard
        </h1>
        <div className="relative md:w-1/3 w-full">
          <FaSearch className="absolute top-3 left-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`pl-10 pr-4 py-3 rounded-2xl border ${borderClasses} focus:outline-none focus:ring-2 focus:ring-teal-600 dark:focus:ring-yellow-400 transition w-full
            ${darkMode ? "bg-gray-800 text-white placeholder-gray-400" : "bg-white text-gray-900 placeholder-gray-400"}`}
          />
        </div>
      </header>

      {/* Stats */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(stats).map(([role, count]) => (
          <div key={role} className={`p-6 rounded-2xl shadow-md ${cardBg} border ${borderClasses} flex flex-col items-center transition hover:shadow-xl`}>
            <p className="text-xl font-semibold">{role}</p>
            <p className="text-3xl font-bold mt-2">{count}</p>
          </div>
        ))}
      </div>

      {/* Users Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.length === 0 ? (
          <p className={`text-center col-span-full ${darkMode ? "text-gray-400" : "text-gray-500"}`}>No users found.</p>
        ) : (
          filteredUsers.map((user) => (
            <div
              key={user.id}
              className={`p-5 rounded-2xl shadow-md border ${borderClasses} ${cardBg} flex justify-between items-center transition-transform transform hover:scale-105 hover:shadow-xl`}
            >
              <div className="flex items-center gap-4">
                {user.currentRole === "Student" ? (
                  <FaUsers className={`${darkMode ? "text-yellow-400" : "text-teal-600"} w-6 h-6`} />
                ) : user.currentRole === "Alumni" ? (
                  <FaUserGraduate className={`${darkMode ? "text-yellow-400" : "text-purple-500"} w-6 h-6`} />
                ) : (
                  <FaExchangeAlt className={`${darkMode ? "text-yellow-400" : "text-yellow-400"} w-6 h-6`} />
                )}
                <div>
                  <p className="font-semibold">{user.name}</p>
                  {getRoleBadge(user.currentRole)}
                </div>
              </div>
              <button
                onClick={() => convertRole(user.id)}
                className={`px-4 py-2 rounded-xl font-semibold shadow-md transition transform hover:scale-105
                  ${darkMode ? "bg-yellow-400 text-gray-900 hover:bg-yellow-300" : "bg-purple-500 text-white hover:bg-purple-400"}`}
              >
                Convert
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
