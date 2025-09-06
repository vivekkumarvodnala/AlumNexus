import React, { useState } from "react";

export default function FilterSidebar() {
  const [branch, setBranch] = useState("");
  const branches = ["CSE", "ECE", "EEE", "MECH", "CIVIL", "CHEM", "MME"];
  const postTypes = ["All", "Interview", "Job", "Internship"];

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md p-5 border border-gray-200 dark:border-gray-700 space-y-6">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
        Filters
      </h2>

      {/* Branch Filter */}
      <div>
        <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-2">
          Branch
        </h3>
        <div className="flex flex-col gap-2 text-sm">
          {branches.map((b) => (
            <label
              key={b}
              className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition cursor-pointer"
            >
              <input
                type="radio"
                name="branch"
                value={b}
                checked={branch === b}
                onChange={(e) => setBranch(e.target.value)}
                className="accent-primary"
              />
              {b}
            </label>
          ))}
        </div>
      </div>

      {/* Post Type Filter */}
      <div>
        <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-2">
          Post Type
        </h3>
        <div className="flex flex-col gap-2 text-sm">
          {postTypes.map((type) => (
            <label
              key={type}
              className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition cursor-pointer"
            >
              <input type="radio" name="postType" className="accent-primary" />
              {type}
            </label>
          ))}
        </div>
      </div>

      {/* Skills Filter */}
      <div>
        <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-2">
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
  );
}
