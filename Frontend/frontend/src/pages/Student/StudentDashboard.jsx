// src/pages/Student/StudentDashboard.jsx
import React from "react";
import { Search, MessageCircle, Bookmark, Shield, Users, Calendar, Play } from "lucide-react";

export default function StudentDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-8 px-4 md:px-6 py-8">

        {/* ================= Left Sidebar ================= */}
        <aside className="hidden lg:flex flex-col col-span-3 space-y-8 sticky top-6 self-start max-h-[calc(100vh-3rem)] overflow-y-auto">
          {/* 🔍 Search */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-lg p-3 border border-gray-200 dark:border-gray-700">
            <div className="relative">
              <Search className="absolute left-3 top-2 w-5 h-5 text-gray-800 dark:text-yellow-400" />
              <input
                type="text"
                placeholder="Search companies, skills..."
                className="w-full pl-10 pr-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-teal-500 text-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-white transition shadow-sm"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-lg p-3 border border-gray-200 dark:border-gray-700 space-y-3"> {/* Reduced padding */}
            {/* Branch Dropdown */}
            <div>
              <h3 className="font-semibold mb-1 text-gray-700 dark:text-yellow-400 text-sm">Branch</h3>
              <select className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-2 py-1 text-xs bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-teal-500 transition">
                <option value="">Select Branch</option>
                {["CSE", "ECE", "EEE", "MECH", "CIVIL", "CHEM", "MME"].map(branch => (
                  <option key={branch} value={branch}>{branch}</option>
                ))}
              </select>
            </div>

            {/* Post Type Dropdown */}
            <div>
              <h3 className="font-semibold mb-1 text-gray-700 dark:text-yellow-400 text-sm">Post Type</h3>
              <select className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-2 py-1 text-xs bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-teal-500 transition">
                <option value="">Select Post Type</option>
                {["All", "Interview", "Job", "Internship"].map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Skills */}
            <div>
              <h3 className="font-semibold mb-1 text-gray-700 dark:text-yellow-400 text-sm">Skills</h3>
              <input
                type="text"
                placeholder="Add skills..."
                className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-2 py-1 text-xs bg-white dark:bg-gray-800 text-gray-800 dark:text-white transition shadow-sm"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-2 mt-1">
              <button className="flex-1 bg-gradient-to-r from-teal-600 to-teal-500 text-white py-1.5 rounded-lg text-xs shadow-sm hover:scale-105 transition-transform">
                Apply
              </button>
              <button className="flex-1 border border-gray-300 dark:border-gray-700 py-1.5 rounded-lg text-xs hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                Clear
              </button>
            </div>
          </div>
        </aside>

        {/* ================= Main Feed ================= */}
        <main className="col-span-9 lg:col-span-6 space-y-8">

          {/* Sort */}
          <div className="flex justify-end mb-2">
            <select className="border border-gray-300 dark:border-gray-700 rounded-lg px-2 py-1 text-xs bg-white dark:bg-gray-800 text-gray-800 dark:text-white shadow-sm focus:ring-2 focus:ring-teal-500">
              <option>Sort by: Newest</option>
              <option>Oldest</option>
            </select>
          </div>

          {/* Job/Post Cards */}
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-2xl shadow-md p-3 hover:shadow-lg hover:scale-[1.01] transition-transform duration-300">

              {/* Header */}
              <div className="flex items-center gap-2 mb-2">
                <img src={`https://i.pravatar.cc/40?img=${i+10}`} className="w-8 h-8 rounded-full border-2 border-teal-500" alt="alumni"/>
                <div>
                  <p className="font-semibold text-gray-800 dark:text-white text-sm">Ravi Kumar</p>
                  <p className="text-xs text-gray-500 dark:text-yellow-400 flex items-center gap-1">
                    CSE '19 <Shield className="w-3 h-3 text-yellow-400"/>
                  </p>
                </div>
              </div>

              {/* Title */}
              <h2 className="font-bold text-sm mb-1 text-gray-900 dark:text-white hover:text-teal-500 cursor-pointer transition">
                Job at Google
              </h2>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-2 text-xs">
                <span className="px-2 py-0.5 bg-gradient-to-r from-teal-100 to-teal-200 text-teal-600 rounded-full font-semibold">Job</span>
                <span className="px-2 py-0.5 bg-gradient-to-r from-violet-100 to-violet-200 text-violet-500 rounded-full font-semibold">React</span>
                <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full font-semibold">System Design</span>
              </div>

              {/* Short Content */}
              <p className="text-xs text-gray-600 dark:text-gray-200 mb-2 line-clamp-2">
                Engineers wanted for scalable systems… Apply now and join a dynamic team building cutting-edge technology solutions.
              </p>

              {/* Actions */}
              <div className="flex gap-4 text-xs text-gray-500 dark:text-gray-200">
                <button className="flex items-center gap-1 hover:text-teal-600 dark:hover:text-yellow-300 transition">
                  <MessageCircle className="w-3 h-3"/> 12
                </button>
                <button className="flex items-center gap-1 hover:text-teal-600 dark:hover:text-yellow-300 transition">
                  <Bookmark className="w-3 h-3"/> 5
                </button>
              </div>

            </div>
          ))}

        </main>

        {/* ================= Right Sidebar ================= */}
        <aside className="hidden lg:flex flex-col col-span-3 space-y-8 sticky top-6 self-start max-h-[calc(100vh-3rem)] overflow-y-auto">

          {/* Top Contributors */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl p-3 shadow-md border border-gray-200 dark:border-gray-700">
            <h3 className="font-bold text-gray-800 dark:text-white mb-3 flex items-center gap-2 text-sm">
              <Users className="w-5 h-5 text-teal-600 dark:text-yellow-400"/> Top Contributors
            </h3>
            {[1,2,3].map((c, idx)=>(
              <div key={c} className="flex items-center justify-between mb-2 text-xs">
                <div className="flex items-center gap-2">
                  <img src={`https://i.pravatar.cc/30?img=${c+20}`} className="w-6 h-6 rounded-full border-2 border-teal-500"/>
                  <span className="text-gray-700 dark:text-white">User {c}</span>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-200">{100-idx*10} pts</span>
              </div>
            ))}
          </div>

          {/* Audio Stories */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl p-3 shadow-md border border-gray-200 dark:border-gray-700">
            <h3 className="font-bold text-gray-800 dark:text-white mb-3 flex items-center gap-2 text-sm">
              <Play className="w-5 h-5 text-violet-500 dark:text-yellow-400"/> Audio Stories
            </h3>
            {[1,2].map(a=>(
              <div key={a} className="flex items-center gap-3 mb-2">
                <button className="w-7 h-7 bg-gradient-to-r from-teal-600 to-teal-500 text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                  ▶
                </button>
                <div>
                  <p className="text-xs font-medium text-gray-800 dark:text-white">Story {a}</p>
                  <span className="text-xs text-gray-500 dark:text-gray-200">Alumnus Name</span>
                </div>
              </div>
            ))}
          </div>

          {/* Mock Interviews */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl p-3 shadow-md border border-gray-200 dark:border-gray-700">
            <h3 className="font-bold text-gray-800 dark:text-white mb-3 flex items-center gap-2 text-sm">
              <Calendar className="w-5 h-5 text-green-500 dark:text-yellow-400"/> Upcoming Mock Interviews
            </h3>
            {[1,2].map(m=>(
              <div key={m} className="flex justify-between items-center mb-2 text-xs">
                <div>
                  <p className="font-medium text-gray-800 dark:text-white">Aug {20+m}</p>
                  <span className="text-xs text-gray-500 dark:text-gray-200">Alumnus Name</span>
                </div>
                <a href="#" className="text-teal-600 dark:text-yellow-300 font-medium hover:underline">Book Now</a>
              </div>
            ))}
          </div>

        </aside>
      </div>
    </div>
  );
}
