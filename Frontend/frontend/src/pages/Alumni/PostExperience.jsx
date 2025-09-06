// Alumni/PostExperience.jsx
import React, { useState } from "react";
import { FaMicrophoneAlt } from "react-icons/fa";

export default function PostExperience() {
  const [experience, setExperience] = useState("");

  return (
    <div
      className={`p-6 rounded-2xl shadow-md border transition-colors duration-300
        bg-white text-gray-900 border-gray-300
        dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600`}
    >
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <FaMicrophoneAlt className="text-[#0D9488] dark:text-[#8B5CF6]" />
        Share Experience
      </h2>

      <textarea
        rows="5"
        value={experience}
        onChange={(e) => setExperience(e.target.value)}
        placeholder="Write about your interview or career journey..."
        className={`p-3 w-full rounded-lg border outline-none transition
          border-gray-300 focus:ring-2 focus:ring-[#0D9488]
          dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:focus:ring-[#8B5CF6]`}
      />

      <button
        className={`mt-3 px-4 py-2 rounded-lg text-white transition
          bg-[#0D9488] hover:bg-teal-700
          dark:bg-[#8B5CF6] dark:hover:bg-violet-700`}
      >
        Share Experience
      </button>
    </div>
  );
}
