// src/pages/Student/SuccessStories.jsx
import React from "react";

export default function SuccessStories() {
  // Dummy success stories
  const stories = [
    {
      id: 1,
      name: "Ravi Kumar",
      batch: "CSE '19",
      company: "Google",
      story:
        "From RGUKT to Google – my journey was full of challenges, but persistence and consistent problem-solving helped me land my dream role.",
    },
    {
      id: 2,
      name: "Anjali Sharma",
      batch: "ECE '18",
      company: "Microsoft",
      story:
        "With strong fundamentals and mentorship, I transitioned into Microsoft as a full-stack engineer. Networking and continuous learning were key.",
    },
  ];

  return (
    <div className="min-h-screen bg-bg dark:bg-accent px-6 py-8">
      <h1 className="text-2xl font-bold text-accent dark:text-gray-200 mb-6">
        Success Stories
      </h1>

      {/* Grid of Stories */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {stories.map((story) => (
          <div
            key={story.id}
            className="bg-white dark:bg-accent border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm p-5 hover:shadow-md transition"
          >
            {/* Alumni Info */}
            <div className="flex items-center gap-3 mb-3">
              <img
                src={`https://i.pravatar.cc/150?img=${story.id + 30}`}
                alt={story.name}
                className="w-12 h-12 rounded-full border border-gray-200 dark:border-gray-700"
              />
              <div>
                <h2 className="font-semibold text-accent dark:text-gray-100">
                  {story.name}
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {story.batch}
                </p>
              </div>
            </div>

            {/* Company */}
            <p className="text-sm text-secondary font-medium mb-2">
              {story.company}
            </p>

            {/* Story */}
            <p className="text-sm text-accent/80 dark:text-gray-300">
              {story.story}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
