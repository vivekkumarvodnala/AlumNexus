// src/components/RoleConversion.jsx
import React, { useState } from "react";
import { FaUserGraduate, FaUsers, FaExchangeAlt } from "react-icons/fa";
import { useTheme } from "../../context/ThemeProvider"; // theme path

const mockUsers = [
  { id: 1, name: "Nithin", currentRole: "Student" },
  { id: 2, name: "Vivek", currentRole: "Student" },
  { id: 3, name: "Balaji", currentRole: "Alumni" },
  { id: 4, name: "Sakarwal", currentRole: "Alumni" },
];

export default function RoleConversion() {
  const { darkMode } = useTheme();
  const [users, setUsers] = useState(mockUsers);

  const themeClasses = darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900";
  const borderClasses = darkMode ? "border-gray-700" : "border-gray-200";
  const cardBg = darkMode ? "bg-gray-800" : "bg-white";

  const convertRole = (id) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id
          ? {
              ...user,
              currentRole:
                user.currentRole === "Student"
                  ? "Alumni"
                  : user.currentRole === "Alumni"
                  ? "Moderator"
                  : "Alumni",
            }
          : user
      )
    );
  };

  return (
    <div className={`p-6 rounded-2xl shadow-md border transition-colors duration-500 ${themeClasses} ${borderClasses}`}>
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <FaExchangeAlt className="text-primary" />
        Role Conversion
      </h2>
      <p className={`${darkMode ? "text-gray-300" : "text-gray-600"} mb-4`}>
        Convert users from one role to another easily.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {users.map((user) => (
          <div
            key={user.id}
            className={`p-4 rounded-xl shadow-sm border ${borderClasses} ${cardBg} flex justify-between items-center transition hover:shadow-lg`}
          >
            <div className="flex items-center gap-3">
              {user.currentRole === "Student" ? (
                <FaUsers className="text-primary w-6 h-6" />
              ) : user.currentRole === "Alumni" ? (
                <FaUserGraduate className="text-green-500 w-6 h-6" />
              ) : (
                <FaExchangeAlt className="text-yellow-500 w-6 h-6" />
              )}
              <div>
                <p className="font-medium">{user.name}</p>
                <p className={`${darkMode ? "text-gray-400" : "text-gray-500"} text-sm`}>
                  {user.currentRole}
                </p>
              </div>
            </div>
            <button
              onClick={() => convertRole(user.id)}
              className="px-3 py-1 bg-secondary text-white rounded-lg hover:bg-purple-700 transition"
            >
              Convert
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
