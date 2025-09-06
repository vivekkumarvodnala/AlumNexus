// src/pages/Student/Sidebar/BranchSidebar.jsx
import React from "react";

export default function BranchSidebar() {
  const branches = ["CSE", "ECE", "EEE", "MECH", "CIVIL", "CHEM", "MME"];

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md p-5 border border-gray-200 dark:border-gray-700">
      <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-3">
        Select Branch
      </h3>
      <div className="flex flex-col gap-2 text-sm">
        {branches.map((branch) => (
          <label
            key={branch}
            className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition cursor-pointer"
          >
            <input
              type="radio"
              name="branch"
              value={branch}
              className="accent-primary"
            />
            {branch}
          </label>
        ))}
      </div>
    </div>
  );
}
