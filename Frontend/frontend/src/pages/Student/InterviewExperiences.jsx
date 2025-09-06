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
    <div className="min-h-screen bg-bg dark:bg-accent px-6 py-8">
      <h1 className="text-2xl font-bold text-accent dark:text-gray-100 mb-6">
        Interview Experiences
      </h1>

      <div className="space-y-6">
        {experiences.map((exp) => (
          <div
            key={exp.id}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm p-5 hover:shadow-md transition"
          >
            {/* Title */}
            <h2 className="font-bold text-lg text-accent dark:text-gray-100">
              {exp.title}
            </h2>

            {/* Author */}
            <div className="flex items-center gap-2 text-sm mb-3">
              <img
                src={`https://i.pravatar.cc/150?img=${exp.id + 30}`}
                alt={exp.author}
                className="w-8 h-8 rounded-full"
              />
              <span className="font-semibold text-accent dark:text-gray-200">
                {exp.author}
              </span>
              <span className="text-gray-500 dark:text-gray-400">
                {exp.batch}
              </span>
              {exp.verified && <Shield className="w-4 h-4 text-yellow-500" />}
            </div>

            {/* Content */}
            <p className="text-sm text-accent/80 dark:text-gray-300 mb-4">
              {exp.content}
            </p>

            {/* Actions */}
            <button
              onClick={() => speak(exp.content)}
              className="flex items-center gap-2 px-4 py-2 bg-secondary text-white rounded-lg text-sm hover:bg-violet-700 transition"
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
