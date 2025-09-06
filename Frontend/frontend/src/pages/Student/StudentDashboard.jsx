// src/pages/Student/StudentDashboard.jsx
import React from "react";
import {
  Search,
  MessageCircle,
  Bookmark,
  Shield,
  Bell,
  Play,
  Users,
  Calendar,
} from "lucide-react";

export default function StudentDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-6 px-4 md:px-6 py-6">
        {/* ================= Left Sidebar ================= */}
        <aside className="hidden lg:block col-span-3 space-y-6 sticky top-6 self-start">
          {/* 🔍 Search */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md p-5 border border-gray-200 dark:border-gray-700">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400 dark:text-gray-500" />
              <input
                type="text"
                placeholder="Search companies, skills..."
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary/40 text-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md p-5 border border-gray-200 dark:border-gray-700 space-y-6">
            {/* 📚 Branch Filter */}
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-3">
                Branch
              </h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {["CSE", "ECE", "EEE", "MECH", "CIVIL", "CHEM", "MME"].map(
                  (branch) => (
                    <label
                      key={branch}
                      className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                    >
                      <input type="checkbox" className="accent-primary" />
                      {branch}
                    </label>
                  )
                )}
              </div>
            </div>

            {/* 📝 Post Type Filter */}
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-3">
                Post Type
              </h3>
              <div className="space-y-2 text-sm">
                {["All", "Interview", "Job", "Internship"].map((type) => (
                  <label
                    key={type}
                    className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800 px-2 py-1 rounded-lg transition"
                  >
                    <input
                      type="radio"
                      name="postType"
                      className="accent-primary"
                    />{" "}
                    {type}
                  </label>
                ))}
              </div>
            </div>

            {/* 🛠 Skills */}
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-3">
                Skills
              </h3>
              <input
                type="text"
                placeholder="Add skills..."
                className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button className="flex-1 bg-primary text-white py-2 rounded-lg text-sm hover:bg-primary/90 transition">
                Apply
              </button>
              <button className="flex-1 border border-gray-300 dark:border-gray-600 py-2 rounded-lg text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                Clear
              </button>
            </div>
          </div>
        </aside>

        {/* ================= Main Feed ================= */}
        <main className="col-span-12 lg:col-span-6 space-y-6">
          {/* Sort */}
          <div className="flex justify-end">
            <select className="border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 text-sm bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 shadow-sm">
              <option>Sort by: Newest</option>
              <option>Oldest</option>
            </select>
          </div>

          {/* Post Cards */}
          {[1, 2].map((i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-md p-6 hover:shadow-lg transition"
            >
              {/* Post Header */}
              <div className="flex items-center gap-3 mb-3">
                <img
                  src="https://via.placeholder.com/40"
                  alt="alumni"
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-semibold text-gray-800 dark:text-gray-200">
                    Ravi Kumar
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                    CSE '19 <Shield className="w-3 h-3 text-yellow-500" />
                  </p>
                </div>
              </div>

              {/* Title */}
              <h2 className="font-bold text-lg mb-2 text-gray-900 dark:text-gray-100">
                Job Opening at Google
              </h2>

              {/* Tags */}
              <div className="flex gap-2 flex-wrap mb-3">
                <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
                  Job
                </span>
                <span className="px-2 py-1 bg-secondary/10 text-secondary rounded-full text-xs">
                  React
                </span>
                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-full text-xs">
                  System Design
                </span>
              </div>

              {/* Content */}
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                We are looking for engineers passionate about scalable
                systems…
              </p>

              {/* Actions */}
              <div className="flex gap-6 text-sm text-gray-500 dark:text-gray-400">
                <button className="flex items-center gap-1 hover:text-primary transition">
                  <MessageCircle className="w-4 h-4" /> 12
                </button>
                <button className="flex items-center gap-1 hover:text-primary transition">
                  <Bookmark className="w-4 h-4" /> 5
                </button>
              </div>
            </div>
          ))}
        </main>

        {/* ================= Right Sidebar ================= */}
        <aside className="hidden lg:block col-span-3 space-y-6 sticky top-6 self-start">
          {/* Top Contributors */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-md border border-gray-200 dark:border-gray-700">
            <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" /> Top Contributors
            </h3>
            {[1, 2, 3].map((c, idx) => (
              <div
                key={c}
                className="flex items-center justify-between mb-3 text-sm"
              >
                <div className="flex items-center gap-2">
                  <img
                    src="https://via.placeholder.com/30"
                    className="w-7 h-7 rounded-full"
                  />
                  <span className="text-gray-700 dark:text-gray-200">
                    User {c}
                  </span>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {100 - idx * 10} pts
                </span>
              </div>
            ))}
          </div>

          {/* Audio Stories */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-md border border-gray-200 dark:border-gray-700">
            <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
              <Play className="w-5 h-5 text-secondary" /> Newest Audio Stories
            </h3>
            {[1, 2].map((a) => (
              <div key={a} className="flex items-center gap-3 mb-3">
                <button className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center">
                  ▶
                </button>
                <div>
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                    Story {a}
                  </p>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Alumnus Name
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Mock Interviews */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-md border border-gray-200 dark:border-gray-700">
            <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-green-500" /> Upcoming Mock
              Interviews
            </h3>
            {[1, 2].map((m) => (
              <div
                key={m}
                className="flex justify-between items-center mb-3 text-sm"
              >
                <div>
                  <p className="font-medium text-gray-800 dark:text-gray-200">
                    Aug {20 + m}
                  </p>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Alumnus Name
                  </span>
                </div>
                <a
                  href="#"
                  className="text-primary font-medium hover:underline"
                >
                  Book Now
                </a>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
