// Alumni/ManageProfile.jsx
import React, { useState } from "react";
import { FaUserEdit } from "react-icons/fa";

export default function ManageProfile() {
  const [profile, setProfile] = useState({
    name: "",
    batch: "",
    company: "",
    role: "",
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  return (
    <div
      className={`p-6 rounded-2xl shadow-md border transition-colors duration-300 
        bg-white text-gray-900 border-gray-300 
        dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600`}
    >
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <FaUserEdit className="text-[#0D9488] dark:text-[#8B5CF6]" />
        Manage Profile
      </h2>

      <form className="grid gap-4">
        {["name", "batch", "company", "role"].map((field) => (
          <input
            key={field}
            name={field}
            placeholder={`Enter ${field}`}
            value={profile[field]}
            onChange={handleChange}
            className={`p-3 rounded-lg border transition outline-none 
              border-gray-300 focus:ring-2 focus:ring-[#0D9488] 
              dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 
              dark:focus:ring-[#8B5CF6]`}
          />
        ))}

        <button
          type="button"
          className={`px-4 py-2 rounded-lg transition text-white 
            bg-[#0D9488] hover:bg-teal-700 
            dark:bg-[#8B5CF6] dark:hover:bg-violet-700`}
        >
          Save Profile
        </button>
      </form>
    </div>
  );
}
