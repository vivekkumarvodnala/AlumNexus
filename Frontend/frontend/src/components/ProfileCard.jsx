// src/components/ProfileCard.jsx
import { FaUserCircle } from "react-icons/fa";

function ProfileCard({ name, role, description }) {
  return (
    <div className="bg-white dark:bg-[#1F2937] border border-gray-200 dark:border-gray-700 rounded-2xl shadow-md p-6 hover:shadow-lg transition">
      <div className="flex items-center gap-4">
        {/* Icon */}
        <FaUserCircle className="text-4xl text-[#8B5CF6] dark:text-yellow-400 dark:hover:text-yellow-300 transition-colors" />
        
        {/* Name + Role */}
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white dark:hover:text-yellow-300 transition-colors">
            {name}
          </h3>
          <p className="font-medium text-gray-600 dark:text-gray-300">{role}</p>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm mt-3 text-gray-700 dark:text-gray-300">{description}</p>

      {/* Button */}
      <button className="mt-4 px-4 py-2 bg-[#0D9488] text-white hover:bg-teal-700 
        dark:bg-yellow-400 dark:text-black dark:hover:bg-yellow-300 
        rounded-lg transition-colors">
        View Profile
      </button>
    </div>
  );
}

export default ProfileCard;
