// Alumni/PostResource.jsx
import React, { useState } from "react";
import { FaFileUpload } from "react-icons/fa";

export default function PostResource() {
  const [resource, setResource] = useState("");

  return (
    <div
      className={`p-6 rounded-2xl shadow-md border transition-colors duration-300 
        bg-white text-gray-900 border-gray-300
        dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600`}
    >
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <FaFileUpload className="text-[#0D9488] dark:text-[#8B5CF6]" />
        Upload Resource
      </h2>

      <input
        type="file"
        onChange={(e) => setResource(e.target.files[0]?.name || "")}
        className={`block w-full text-sm file:mr-4 file:py-2 file:px-4 
          file:rounded-md file:border-0 file:text-sm file:font-semibold
          file:bg-[#0D9488] file:text-white hover:file:bg-teal-700
          dark:file:bg-[#8B5CF6] dark:hover:file:bg-violet-700 
          text-gray-600 dark:text-gray-300`}
      />

      {resource && (
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Uploaded: {resource}
        </p>
      )}

      <button
        className={`mt-3 px-4 py-2 rounded-lg text-white transition
          bg-[#0D9488] hover:bg-teal-700
          dark:bg-[#8B5CF6] dark:hover:bg-violet-700`}
      >
        Submit Resource
      </button>
    </div>
  );
}
