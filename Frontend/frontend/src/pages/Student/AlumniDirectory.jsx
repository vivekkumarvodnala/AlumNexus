// src/pages/Student/AlumniDirectory.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AlumniDirectory() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

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
    <div className="min-h-screen px-6 py-8 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <h1 className="text-2xl font-bold text-[#1F2937] dark:text-white mb-6">
        Alumni Directory
      </h1>

      {/* Search Bar */}
      <div className="max-w-md mb-8">
        <input
          type="text"
          placeholder="Search alumni by name, company, or skill..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-[#1F2937] dark:text-white text-sm focus:ring-2 focus:ring-teal-600 dark:focus:ring-yellow-400 transition shadow-sm"
        />
      </div>

      {/* Grid of Alumni */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((alumni) => (
          <div
            key={alumni.id}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm hover:shadow-md transition p-5 flex flex-col justify-between hover:scale-[1.02] duration-300"
          >
            <div>
              {/* Avatar & Name */}
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={`https://i.pravatar.cc/150?img=${alumni.id + 10}`}
                  alt={alumni.name}
                  className="w-12 h-12 rounded-full border border-gray-200 dark:border-yellow-400"
                />
                <div>
                  <h2 className="font-semibold text-[#1F2937] dark:text-white">{alumni.name}</h2>
                  <p className="text-xs text-gray-500 dark:text-yellow-400">{alumni.batch}</p>
                </div>
              </div>

              {/* Company */}
              <p className="text-sm text-gray-700 dark:text-white mb-3">{alumni.company}</p>

              {/* Skills */}
              <div className="flex flex-wrap gap-2 mb-4">
                {alumni.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className={`px-2 py-1 text-xs rounded-full font-medium 
                      bg-teal-100 text-[#0D9488] dark:bg-yellow-400/20 dark:text-yellow-400`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* View Profile Button */}
            <button
              onClick={() => navigate(`/student/alumni/${alumni.id}`)}
              className="w-full py-2 rounded-lg text-sm font-medium 
                bg-[#8B5CF6] text-white hover:bg-[#7C3AED] dark:bg-yellow-400 dark:text-gray-900 dark:hover:bg-yellow-300 transition"
            >
              View Profile
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
