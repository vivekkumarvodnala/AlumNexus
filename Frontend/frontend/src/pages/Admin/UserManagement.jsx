// src/components/UserManagement.jsx
import React, { useState } from "react";
import { FaUser, FaUserGraduate, FaUsers, FaSearch, FaToggleOn, FaToggleOff } from "react-icons/fa";
import { useTheme } from "../../context/ThemeProvider"; // theme path

const mockUsers = [
  { id: 1, name: "Nithin", role: "Student", active: true },
  { id: 2, name: "Vivek", role: "Student", active: false },
  { id: 3, name: "Balaji", role: "Alumni", active: true },
  { id: 4, name: "Sakarwal", role: "Moderator", active: true },
];

export default function UserManagement() {
  const { darkMode } = useTheme();
  const [users, setUsers] = useState(mockUsers);
  const [search, setSearch] = useState("");

  const themeClasses = darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900";
  const borderClasses = darkMode ? "border-gray-700" : "border-gray-200";
  const inputBg = darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900";
  const cardBg = darkMode ? "bg-gray-800" : "bg-white";

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.role.toLowerCase().includes(search.toLowerCase())
  );

  const toggleActive = (id) => {
    setUsers((prev) =>
      prev.map((user) => (user.id === id ? { ...user, active: !user.active } : user))
    );
  };

  const cycleRole = (id) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id
          ? {
              ...user,
              role:
                user.role === "Student"
                  ? "Alumni"
                  : user.role === "Alumni"
                  ? "Moderator"
                  : "Student",
            }
          : user
      )
    );
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case "Student":
        return <FaUsers className="text-primary w-6 h-6" />;
      case "Alumni":
        return <FaUserGraduate className="text-green-500 w-6 h-6" />;
      default:
        return <FaUser className="text-yellow-500 w-6 h-6" />;
    }
  };

  return (
    <div className={`p-6 rounded-2xl shadow-md border transition-colors duration-500 ${themeClasses} ${borderClasses}`}>
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <FaUser className="text-primary" />
        User Management
      </h2>
      <p className={`${darkMode ? "text-gray-300" : "text-gray-600"} mb-4`}>
        Manage users: search, change roles, and toggle activity.
      </p>

      {/* Search Bar */}
      <div className="relative mb-6">
        <FaSearch className="absolute top-3 left-3 text-gray-400" />
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={`pl-10 pr-4 py-2 rounded-lg border ${borderClasses} focus:outline-none focus:ring-2 focus:ring-primary transition w-full ${inputBg}`}
        />
      </div>

      {/* Users Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredUsers.length === 0 ? (
          <p className={`${darkMode ? "text-gray-400" : "text-gray-500"} col-span-full text-center`}>
            No users found.
          </p>
        ) : (
          filteredUsers.map((user) => (
            <div
              key={user.id}
              className={`p-4 rounded-xl shadow-sm border ${borderClasses} ${cardBg} flex justify-between items-center transition hover:shadow-lg`}
            >
              <div className="flex items-center gap-3">
                {getRoleIcon(user.role)}
                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className={`${darkMode ? "text-gray-400" : "text-gray-500"} text-sm`}>
                    {user.role}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => cycleRole(user.id)}
                  className="px-3 py-1 bg-secondary text-white rounded-lg hover:bg-purple-700 transition text-sm"
                >
                  Change Role
                </button>
                <button
                  onClick={() => toggleActive(user.id)}
                  className={`px-3 py-1 rounded-lg flex items-center gap-1 transition text-sm ${
                    user.active
                      ? "bg-green-500 text-white hover:bg-green-600"
                      : "bg-red-500 text-white hover:bg-red-600"
                  }`}
                >
                  {user.active ? <FaToggleOn /> : <FaToggleOff />}
                  {user.active ? "Active" : "Inactive"}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
