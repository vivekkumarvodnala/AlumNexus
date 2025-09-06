// src/pages/Student/AlumniDirectory.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function AlumniDirectory() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  // Dummy alumni data
  const alumniList = [
    { id: 1, name: "Ravi Kumar", batch: "CSE '19", company: "Google", skills: ["React", "System Design"] },
    { id: 2, name: "Anjali Sharma", batch: "ECE '18", company: "Microsoft", skills: ["Azure", "C#"] },
    { id: 3, name: "Pranav Reddy", batch: "MECH '17", company: "Tesla", skills: ["CAD", "Automation"] },
    { id: 4, name: "Meena Iyer", batch: "CIVIL '20", company: "L&T", skills: ["Structural", "AutoCAD"] },
  ];

  const filtered = alumniList.filter((alumni) =>
    alumni.name.toLowerCase().includes(search.toLowerCase()) ||
    alumni.company.toLowerCase().includes(search.toLowerCase()) ||
    alumni.skills.some((s) => s.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-bg dark:bg-accent px-6 py-8">
      <h1 className="text-2xl font-bold text-accent dark:text-gray-200 mb-6">
        Alumni Directory
      </h1>

      {/* Search Bar */}
      <div className="max-w-md mb-8">
        <input
          type="text"
          placeholder="Search alumni by name, company, or skill..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-accent text-sm text-accent dark:text-gray-200 focus:ring-2 focus:ring-primary/40"
        />
      </div>

      {/* Grid of Alumni */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((alumni) => (
          <div
            key={alumni.id}
            className="bg-white dark:bg-accent border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm p-5 hover:shadow-md transition"
          >
            <div className="flex items-center gap-3 mb-3">
              <img
                src={`https://i.pravatar.cc/150?img=${alumni.id + 10}`}
                alt={alumni.name}
                className="w-12 h-12 rounded-full border border-gray-200 dark:border-gray-700"
              />
              <div>
                <h2 className="font-semibold text-accent dark:text-gray-200">
                  {alumni.name}
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {alumni.batch}
                </p>
              </div>
            </div>

            <p className="text-sm text-accent/80 dark:text-gray-300 mb-3">
              {alumni.company}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {alumni.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs dark:bg-primary/20 dark:text-primary"
                >
                  {skill}
                </span>
              ))}
            </div>

            <button
                onClick={() => navigate(`/student/alumni/${alumni.id}`)}
             className="w-full bg-secondary text-white py-2 rounded-lg text-sm font-medium hover:bg-secondary/90">
              View Profile
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
