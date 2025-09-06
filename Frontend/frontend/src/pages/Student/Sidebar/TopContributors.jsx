import React from "react";
import { Users } from "lucide-react";

export default function TopContributors() {
  return (
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
  );
}
