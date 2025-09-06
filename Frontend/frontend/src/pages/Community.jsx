import { useState } from "react";
import {
  FaUsers,
  FaShieldAlt,
  FaLock,
  FaCommentDots,
  FaUserCircle,
  FaPaperPlane,
} from "react-icons/fa";

function Community() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: "Anonymous Alumni",
      role: "Alumni",
      content:
        "I recently cracked an interview at a top MNC. Key tip: focus on problem-solving, not just syntax.",
      date: "2025-09-03",
    },
    {
      id: 2,
      user: "Anonymous Student",
      role: "Student",
      content:
        "Can someone share resources for DSA preparation without exposing personal details?",
      date: "2025-09-02",
    },
  ]);

  const [newPost, setNewPost] = useState("");

  const handlePost = () => {
    if (newPost.trim() === "") return;
    const safePost = {
      id: posts.length + 1,
      user: "Anonymous User", // hide real identity
      role: "Member",
      content: sanitizeContent(newPost),
      date: new Date().toISOString().split("T")[0],
    };
    setPosts([safePost, ...posts]);
    setNewPost("");
  };

  // Simple sanitization: hides emails, phone numbers
  const sanitizeContent = (text) => {
    let sanitized = text;
    sanitized = sanitized.replace(
      /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi,
      "[hidden email]"
    );
    sanitized = sanitized.replace(/\b\d{10,}\b/g, "[hidden number]");
    return sanitized;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-6 md:px-16 py-10 text-gray-800 dark:text-gray-100">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-5xl font-bold flex items-center justify-center gap-3 text-primary dark:text-yellow-400">
          <FaUsers /> AlumNexus Community
        </h1>
        <p className="mt-3 text-lg max-w-2xl mx-auto">
          A safe and moderated space for Students & Alumni to connect, share
          knowledge, and support each other.
        </p>
      </div>

      {/* Security Notice */}
      <div className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 p-4 rounded-lg mb-10 flex items-start gap-3">
        <FaShieldAlt size={20} />
        <div>
          <h2 className="font-bold">Community Guidelines</h2>
          <p className="text-sm">
            Please avoid sharing personal data (phone numbers, emails, IDs).
            Posts are automatically sanitized to protect sensitive information.
            Respect others and keep discussions professional.
          </p>
        </div>
      </div>

      {/* Post Form */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md mb-10">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <FaCommentDots /> Share Your Thoughts
        </h2>
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="Write your experience, question, or advice..."
          className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white mb-4"
          rows="4"
        />
        <button
          onClick={handlePost}
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-opacity-90 flex items-center gap-2"
        >
          <FaPaperPlane /> Post
        </button>
      </div>

      {/* Posts Feed */}
      <div className="space-y-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md"
          >
            <div className="flex items-center gap-3 mb-3">
              <FaUserCircle size={32} className="text-gray-500" />
              <div>
                <h3 className="font-bold">
                  {post.user}{" "}
                  <span className="text-sm text-gray-500">({post.role})</span>
                </h3>
                <p className="text-xs text-gray-400">{post.date}</p>
              </div>
            </div>
            <p>{post.content}</p>
          </div>
        ))}
      </div>

      {/* Privacy Footer */}
      <div className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400 flex flex-col items-center gap-2">
        <FaLock /> All sensitive data is automatically hidden. Community posts
        are monitored for security & privacy compliance.
      </div>
    </div>
  );
}

export default Community;
