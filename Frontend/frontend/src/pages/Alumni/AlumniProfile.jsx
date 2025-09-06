// Alumni/ProfilePage.jsx
import React from "react";
import { FaUserGraduate, FaBuilding, FaBriefcase, FaLinkedin, FaEnvelope } from "react-icons/fa";

export default function ProfilePage() {
  const alumni = {
    name: "SakarwalBalaji",
    batch: "CSE - 2025",
    company: "Google",
    role: "Software Engineer",
    email: "balaji@example.com",
    linkedin: "https://linkedin.com/in/balaji",
    bio: "Passionate about building scalable systems and mentoring juniors. Experienced in full-stack development and interview prep guidance.",
    skills: ["React", "Node.js", "MongoDB", "XGBoost", "System Design"],
  };

  return (
    <div
      className={`min-h-screen p-8 transition-colors duration-300 
        bg-[#F9FAFB] text-[#1F2937] dark:bg-gray-900 dark:text-gray-100`}
    >
      {/* Profile Header */}
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Avatar */}
          <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-[#0D9488] to-[#8B5CF6] flex items-center justify-center text-white text-4xl font-bold shadow-lg">
            {alumni.name.charAt(0)}
          </div>

          {/* Info */}
          <div className="flex-1">
            <h1 className="text-3xl font-semibold">{alumni.name}</h1>
            <p className="text-gray-600 dark:text-gray-400">{alumni.batch}</p>

            <div className="flex flex-wrap gap-4 mt-3 text-sm">
              <span className="flex items-center gap-2">
                <FaBuilding className="text-[#0D9488] dark:text-[#8B5CF6]" />
                {alumni.company}
              </span>
              <span className="flex items-center gap-2">
                <FaBriefcase className="text-[#0D9488] dark:text-[#8B5CF6]" />
                {alumni.role}
              </span>
            </div>

            <div className="flex gap-4 mt-4">
              <a
                href={`mailto:${alumni.email}`}
                className="flex items-center gap-2 px-4 py-2 bg-[#0D9488] dark:bg-[#8B5CF6] text-white rounded-lg shadow hover:opacity-90 transition"
              >
                <FaEnvelope /> Email
              </a>
              <a
                href={alumni.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2 border border-[#0D9488] dark:border-[#8B5CF6] text-[#0D9488] dark:text-[#8B5CF6] rounded-lg hover:bg-[#0D9488] hover:text-white dark:hover:bg-[#8B5CF6] dark:hover:text-white transition"
              >
                <FaLinkedin /> LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bio & Skills */}
      <div className="max-w-4xl mx-auto mt-8 grid md:grid-cols-3 gap-6">
        {/* Bio */}
        <div className="md:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-3">About</h2>
          <p className="text-gray-600 dark:text-gray-400">{alumni.bio}</p>
        </div>

        {/* Skills */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-3">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {alumni.skills.map((skill, idx) => (
              <span
                key={idx}
                className="px-3 py-1 text-sm rounded-full bg-[#0D9488]/10 text-[#0D9488] dark:bg-[#8B5CF6]/20 dark:text-[#8B5CF6] font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
