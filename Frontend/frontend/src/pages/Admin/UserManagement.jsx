// src/components/UserManagement.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaUser,
  FaUserGraduate,
  FaUsers,
  FaSearch,
  FaToggleOn,
  FaToggleOff,
} from "react-icons/fa";
import { useTheme } from "../../context/ThemeProvider"; // theme path

const mockUsers = [
  { id: 1, name: "Nithin", role: "Student", active: true },
  { id: 2, name: "Vivek", role: "Student", active: false },
  { id: 3, name: "Balaji", role: "Alumni", active: true },
  { id: 4, name: "Ravi", role: "Moderator", active: true },
];

export default function UserManagement() {
  const { darkMode } = useTheme();
  const [users, setUsers] = useState(mockUsers);
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("All");
  const [sortBy, setSortBy] = useState("name");

  const themeClasses = darkMode
    ? "bg-gray-900 text-gray-100"
    : "bg-gray-50 text-gray-900";
  const borderClasses = darkMode ? "border-gray-700" : "border-gray-200";
  const inputBg = darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900";
  const cardBg = darkMode ? "bg-gray-800" : "bg-white";

  // Fetch users from API (fallback to mock if API fails)
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/users") // replace with your API endpoint
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setUsers(res.data);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch users, using mock data", err);
        setUsers(mockUsers);
      });
  }, []);

  // Stats
  const counts = {
    total: users.length,
    active: users.filter((u) => u.active).length,
    inactive: users.filter((u) => !u.active).length,
    students: users.filter((u) => u.role === "Student").length,
    alumni: users.filter((u) => u.role === "Alumni").length,
    moderators: users.filter((u) => u.role === "Moderator").length,
  };

  // Filtering
  let filteredUsers = users.filter(
    (u) =>
      (filterRole === "All" || u.role === filterRole) &&
      (u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.role.toLowerCase().includes(search.toLowerCase()))
  );

  // Sorting
  filteredUsers = [...filteredUsers].sort((a, b) => {
    if (sortBy === "name") return a.name.localeCompare(b.name);
    if (sortBy === "role") return a.role.localeCompare(b.role);
    return 0;
  });

  const toggleActive = (id) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id ? { ...user, active: !user.active } : user
      )
    );
    axios
      .patch(`http://localhost:5000/api/users/${id}/toggle-active`)
      .catch((err) => console.error("Failed to update active status", err));
  };

  const updateRole = (id, newRole) => {
    setUsers((prev) =>
      prev.map((user) => (user.id === id ? { ...user, role: newRole } : user))
    );
    axios
      .patch(`http://localhost:5000/api/users/${id}/role`, { role: newRole })
      .catch((err) => console.error("Failed to update role", err));
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
    <div
      className={`p-6 rounded-2xl shadow-md border transition-colors duration-500 ${themeClasses} ${borderClasses}`}
    >
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <FaUser className="text-primary" />
        User Management
      </h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 rounded-xl shadow bg-gradient-to-r from-purple-500 to-purple-700 text-white">
          <p className="text-lg font-semibold">Total Users</p>
          <p className="text-2xl">{counts.total}</p>
        </div>
        <div className="p-4 rounded-xl shadow bg-gradient-to-r from-green-500 to-green-700 text-white">
          <p className="text-lg font-semibold">Active</p>
          <p className="text-2xl">{counts.active}</p>
        </div>
        <div className="p-4 rounded-xl shadow bg-gradient-to-r from-red-500 to-red-700 text-white">
          <p className="text-lg font-semibold">Inactive</p>
          <p className="text-2xl">{counts.inactive}</p>
        </div>
        <div className="p-4 rounded-xl shadow bg-gradient-to-r from-blue-500 to-blue-700 text-white">
          <p className="text-lg font-semibold">Students</p>
          <p className="text-2xl">{counts.students}</p>
        </div>
        <div className="p-4 rounded-xl shadow bg-gradient-to-r from-green-600 to-green-800 text-white">
          <p className="text-lg font-semibold">Alumni</p>
          <p className="text-2xl">{counts.alumni}</p>
        </div>
        <div className="p-4 rounded-xl shadow bg-gradient-to-r from-yellow-500 to-yellow-700 text-white">
          <p className="text-lg font-semibold">Moderators</p>
          <p className="text-2xl">{counts.moderators}</p>
        </div>
      </div>

      {/* Search + Filter + Sort */}
      <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
        <div className="relative flex-1 w-full">
          <FaSearch className="absolute top-3 left-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`pl-10 pr-4 py-2 rounded-lg border ${borderClasses} focus:outline-none focus:ring-2 focus:ring-primary transition w-full ${inputBg}`}
          />
        </div>
        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          className={`px-3 py-2 rounded-lg border ${borderClasses} ${inputBg}`}
        >
          <option value="All">All Roles</option>
          <option value="Student">Students</option>
          <option value="Alumni">Alumni</option>
          <option value="Moderator">Moderators</option>
        </select>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className={`px-3 py-2 rounded-lg border ${borderClasses} ${inputBg}`}
        >
          <option value="name">Sort by Name</option>
          <option value="role">Sort by Role</option>
        </select>
      </div>

      {/* Users Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredUsers.length === 0 ? (
          <p
            className={`${darkMode ? "text-gray-400" : "text-gray-500"} col-span-full text-center`}
          >
            No users found.
          </p>
        ) : (
          filteredUsers.map((user) => (
            <div
              key={user.id}
              className={`p-4 rounded-xl shadow-md border ${borderClasses} ${cardBg} flex justify-between items-center transition hover:shadow-lg`}
            >
              <div className="flex items-center gap-3">
                {getRoleIcon(user.role)}
                <div>
                  <p className="font-medium">{user.name}</p>
                  <span
                    className={`inline-block text-xs px-2 py-1 rounded-full ${
                      user.role === "Student"
                        ? "bg-blue-100 text-blue-700"
                        : user.role === "Alumni"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {user.role}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                {/* Role dropdown */}
                <select
                  value={user.role}
                  onChange={(e) => updateRole(user.id, e.target.value)}
                  className="px-2 py-1 rounded-lg border text-sm"
                >
                  <option value="Student">Student</option>
                  <option value="Alumni">Alumni</option>
                  <option value="Moderator">Moderator</option>
                </select>
                {/* Active toggle */}
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
