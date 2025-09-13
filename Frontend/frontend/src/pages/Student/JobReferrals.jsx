// src/pages/Student/JobReferrals.jsx
import React from "react";
import { MessageCircle, Bookmark, Shield } from "lucide-react";

export default function JobReferrals() {
  const jobs = [
    {
      id: 1,
      title: "SDE Internship - Google",
      author: "Ravi Kumar",
      batch: "CSE '19",
      verified: true,
      tags: ["Job", "React", "System Design"],
      snippet: "Exciting opportunity at Google for software interns in the Bangalore office...",
    },
    {
      id: 2,
      title: "Full Stack Engineer - Microsoft",
      author: "Anjali Sharma",
      batch: "ECE '18",
      verified: true,
      tags: ["Job", "Node.js", "Azure"],
      snippet: "Microsoft is hiring full stack engineers with cloud and backend experience...",
    },
  ];

  return (
    <div className="min-h-screen px-6 py-8 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <h1 className="text-2xl font-bold text-[#1F2937] dark:text-white mb-6">
        Job Referrals
      </h1>

      <div className="space-y-6">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm hover:shadow-md transition p-5 flex flex-col justify-between hover:scale-[1.02] duration-300"
          >
            {/* Header */}
            <h2 className="font-bold text-lg text-[#1F2937] dark:text-white mb-2">
              {job.title}
            </h2>
            <div className="flex items-center gap-2 text-sm mb-3">
              <img
                src={`https://i.pravatar.cc/150?img=${job.id + 20}`}
                alt={job.author}
                className="w-8 h-8 rounded-full border border-gray-200 dark:border-yellow-400"
              />
              <span className="font-semibold text-[#1F2937] dark:text-white">
                {job.author}
              </span>
              <span className="text-gray-500 dark:text-yellow-400">
                {job.batch}
              </span>
              {job.verified && <Shield className="w-4 h-4 text-yellow-400" />}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-3">
              {job.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className={`px-2 py-1 text-xs rounded-full font-medium 
                    ${tag === "Job"
                      ? "bg-teal-100 text-[#0D9488] dark:bg-yellow-400/20 dark:text-yellow-400"
                      : "bg-purple-100 text-[#8B5CF6] dark:bg-yellow-400/10 dark:text-yellow-400"
                    }`}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Snippet */}
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
              {job.snippet}
            </p>

            {/* Actions */}
            <div className="flex gap-6 text-sm">
              <div className="flex items-center gap-1 cursor-pointer hover:text-[#0D9488] dark:hover:text-yellow-300 transition">
                <MessageCircle className="w-4 h-4" /> 8
              </div>
              <div className="flex items-center gap-1 cursor-pointer hover:text-[#0D9488] dark:hover:text-yellow-300 transition">
                <Bookmark className="w-4 h-4" /> 3
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
