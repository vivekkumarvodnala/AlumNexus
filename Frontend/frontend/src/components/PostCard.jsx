// src/components/PostCard.jsx
import { FaArrowRight } from "react-icons/fa";

function PostCard({ title, content }) {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-md p-6 hover:shadow-lg transition">
      {/* Title */}
      <h3 className="text-xl font-bold text-white dark:text-white dark:hover:text-yellow-300 transition-colors mb-2">
        {title}
      </h3>

      {/* Content */}
      <p className="text-white dark:text-gray-300">{content}</p>

      {/* Button */}
      <button className="mt-4 px-4 py-2 bg-white text-black dark:bg-yellow-400 dark:text-black rounded-lg flex items-center gap-2 transition-colors dark:hover:bg-yellow-300">
        Learn More <FaArrowRight className="text-white dark:text-yellow-400 dark:hover:text-yellow-300 transition-colors" />
      </button>
    </div>
  );
}

export default PostCard;
