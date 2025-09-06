// src/pages/Student/AlumniProfile.jsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function StudentAlumniProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Dummy alumni data (should be fetched from backend later)
  const alumniList = {
    1: { name: "Ravi Kumar", batch: "CSE '19", company: "Google", skills: ["React", "System Design"], bio: "Currently working at Google Bangalore as SDE-2." },
    2: { name: "Anjali Sharma", batch: "ECE '18", company: "Microsoft", skills: ["Azure", "C#"], bio: "Software Engineer at Microsoft, Hyderabad." },
    3: { name: "Pranav Reddy", batch: "MECH '17", company: "Tesla", skills: ["CAD", "Automation"], bio: "Design Engineer at Tesla, California." },
    4: { name: "Meena Iyer", batch: "CIVIL '20", company: "L&T", skills: ["Structural", "AutoCAD"], bio: "Structural Engineer at L&T." },
  };

  const alumni = alumniList[id];

  if (!alumni) {
    return <p className="text-center mt-10 text-gray-500">Alumnus not found.</p>;
  }

  return (
    <div className="min-h-screen bg-bg dark:bg-accent px-6 py-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-6 text-primary hover:underline"
      >
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm p-6">
        {/* Header */}
        <div className="flex items-center gap-6 mb-6">
          <img
            src={`https://i.pravatar.cc/150?img=${parseInt(id) + 10}`}
            alt={alumni.name}
            className="w-24 h-24 rounded-full border"
          />
          <div>
            <h1 className="text-2xl font-bold text-accent dark:text-gray-100">
              {alumni.name}
            </h1>
            <p className="text-gray-500 dark:text-gray-400">{alumni.batch}</p>
            <p className="text-sm text-accent/80 dark:text-gray-300">
              {alumni.company}
            </p>
          </div>
        </div>

        {/* Bio */}
        <p className="text-sm text-accent/80 dark:text-gray-300 mb-4">
          {alumni.bio}
        </p>

        {/* Skills */}
        <h3 className="font-semibold text-accent dark:text-gray-100 mb-2">Skills</h3>
        <div className="flex flex-wrap gap-2 mb-6">
          {alumni.skills.map((skill, idx) => (
            <span
              key={idx}
              className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* Contact Button (future feature) */}
        <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-teal-700">
          Contact Alumni
        </button>
      </div>
    </div>
  );
}
