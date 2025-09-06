// src/pages/Student/JobReferrals.jsx
import React from "react";
import { MessageCircle, Bookmark, Shield } from "lucide-react";

export default function JobReferrals() {
  // Dummy job referral posts
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
    <div className="min-h-screen bg-bg dark:bg-accent px-6 py-8">
      <h1 className="text-2xl font-bold text-accent dark:text-gray-200 mb-6">
        Job Referrals
      </h1>

      <div className="space-y-6">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="bg-white dark:bg-accent border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm p-5 hover:shadow-md transition"
          >
            {/* Header */}
            <h2 className="font-bold text-lg text-accent dark:text-gray-100">
              {job.title}
            </h2>
            <div className="flex items-center gap-2 text-sm mb-3">
              <img
                src={`https://i.pravatar.cc/150?img=${job.id + 20}`}
                alt={job.author}
                className="w-8 h-8 rounded-full border border-gray-200 dark:border-gray-700"
              />
              <span className="font-semibold text-accent dark:text-gray-200">
                {job.author}
              </span>
              <span className="text-gray-500 dark:text-gray-400">
                {job.batch}
              </span>
              {job.verified && <Shield className="w-4 h-4 text-yellow-500" />}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-3">
              {job.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className={`px-2 py-1 rounded-full text-xs ${
                    tag === "Job"
                      ? "bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary"
                      : "bg-secondary/10 text-secondary dark:bg-secondary/20 dark:text-secondary"
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Snippet */}
            <p className="text-sm text-accent/80 dark:text-gray-300 mb-4">
              {job.snippet}
            </p>

            {/* Actions */}
            <div className="flex gap-6 text-gray-500 dark:text-gray-400 text-sm">
              <div className="flex items-center gap-1 hover:text-primary cursor-pointer">
                <MessageCircle className="w-4 h-4" /> 8
              </div>
              <div className="flex items-center gap-1 hover:text-primary cursor-pointer">
                <Bookmark className="w-4 h-4" /> 3
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
