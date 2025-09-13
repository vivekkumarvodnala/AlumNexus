// src/pages/Student/InterviewExperiences.jsx
import React from "react";
import { Volume2, Shield } from "lucide-react";

export default function InterviewExperiences() {
  // Dummy experiences
  const experiences = [
    {
      id: 1,
      title: "My Google Interview Journey",
      author: "Ravi Kumar",
      batch: "CSE '19",
      verified: true,
      content:
        "The Google interview focused heavily on problem solving and system design. I solved dynamic programming questions and discussed scalability...",
    },
    {
      id: 2,
      title: "Microsoft Internship Experience",
      author: "Anjali Sharma",
      batch: "ECE '18",
      verified: true,
      content:
        "My Microsoft interviews emphasized cloud knowledge, especially Azure services. They asked me to build a small API and explain deployment...",
    },
  ];

  // Text-to-Speech handler
  const speak = (text) => {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-US";
    window.speechSynthesis.speak(speech);
  };

  return (
    <div className="min-h-screen px-6 py-8 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <h1 className="text-2xl font-bold text-[#1F2937] dark:text-white mb-6">
        Interview Experiences
      </h1>

      <div className="space-y-6">
        {experiences.map((exp) => (
          <div
            key={exp.id}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm hover:shadow-lg transition p-5 hover:scale-[1.02] duration-300"
          >
            {/* Title */}
            <h2 className="font-bold text-lg text-[#1F2937] dark:text-white mb-2">
              {exp.title}
            </h2>

            {/* Author */}
            <div className="flex items-center gap-2 text-sm mb-3">
              <img
                src={`https://i.pravatar.cc/150?img=${exp.id + 30}`}
                alt={exp.author}
                className="w-8 h-8 rounded-full border border-gray-200 dark:border-yellow-400"
              />
              <span className="font-semibold text-[#1F2937] dark:text-white">
                {exp.author}
              </span>
              <span className="text-gray-500 dark:text-yellow-400">
                {exp.batch}
              </span>
              {exp.verified && <Shield className="w-4 h-4 text-yellow-400" />}
            </div>

            {/* Content */}
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
              {exp.content}
            </p>

            {/* Actions */}
            <button
              onClick={() => speak(exp.content)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition 
                bg-[#8B5CF6] text-white hover:bg-[#7C3AED] dark:bg-yellow-400 dark:text-gray-900 dark:hover:bg-yellow-300"
            >
              <Volume2 className="w-4 h-4" />
              Listen
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
