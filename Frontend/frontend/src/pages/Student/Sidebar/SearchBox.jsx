// src/pages/Student/Sidebar/SearchBox.jsx
import React from "react";
import { Search } from "lucide-react";

export default function SearchBox() {
  return (
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
  );
}
