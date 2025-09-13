// Alumni/ManageProfile.jsx
import React, { useState, useEffect } from "react";
import { FaUserEdit, FaSave, FaTimes, FaUpload } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

export default function ManageProfile() {
  const [profile, setProfile] = useState({
    name: "",
    batch: "",
    company: "",
    role: "",
    bio: "",
    avatar: "",
  });

  const [initialProfile, setInitialProfile] = useState(null); // for reset
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [message, setMessage] = useState("");
  const [bioCount, setBioCount] = useState(0);

  // ✅ Fetch profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("/api/profile");
        setProfile(res.data);
        setInitialProfile(res.data);
      } catch (err) {
        console.error("Failed to load profile:", err);
      } finally {
        setFetching(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
    if (e.target.name === "bio") {
      setBioCount(e.target.value.length);
    }
  };

  // ✅ Upload profile picture
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const res = await axios.post("/api/profile/upload-avatar", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setProfile({ ...profile, avatar: res.data.url });
      setMessage("✅ Profile picture updated!");
    } catch (err) {
      console.error("Error uploading image:", err);
      setMessage("❌ Failed to upload picture.");
    }
  };

  // ✅ Save profile
  const handleSave = async () => {
    if (!profile.name || !profile.batch || !profile.company || !profile.role) {
      setMessage("⚠️ Please fill in all required fields.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");
      await axios.post("/api/profile", profile);
      setMessage("🎉 Profile saved successfully!");
      setInitialProfile(profile);
    } catch (error) {
      console.error("Error saving profile:", error);
      setMessage("❌ Failed to save profile.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Reset profile
  const handleReset = () => {
    if (initialProfile) {
      setProfile(initialProfile);
      setBioCount(initialProfile.bio?.length || 0);
      setMessage("↩️ Changes reverted.");
    }
  };

  return (
    <motion.div
      className={`p-8 rounded-3xl shadow-2xl border transition-colors duration-300 
        bg-white text-gray-900 border-gray-200
        dark:bg-gray-900 dark:text-white dark:border-gray-700 w-full max-w-3xl mx-auto`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <FaUserEdit className="text-2xl text-[#0D9488] dark:text-[#8B5CF6]" />
        <h2 className="text-2xl font-bold">Manage Profile</h2>
      </div>

      {/* Loading Skeleton */}
      {fetching ? (
        <div className="animate-pulse space-y-4">
          <div className="h-32 w-32 bg-gray-300 dark:bg-gray-700 rounded-full mx-auto" />
          <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mx-auto" />
          <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mx-auto" />
        </div>
      ) : (
        <form className="grid gap-5">
          {/* Avatar Upload */}
          <div className="flex flex-col items-center">
            <img
              src={profile.avatar || "https://via.placeholder.com/150"}
              alt="Profile Avatar"
              className="w-32 h-32 rounded-full object-cover shadow-lg border-4 border-gray-200 dark:border-gray-700"
            />
            <label className="mt-3 cursor-pointer flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg shadow-md bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700">
              <FaUpload />
              Change Picture
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </label>
          </div>

          {/* Profile Fields */}
          {[
            { name: "name", label: "Full Name" },
            { name: "batch", label: "Batch (e.g. 2020)" },
            { name: "company", label: "Company" },
            { name: "role", label: "Role / Position" },
          ].map((field) => (
            <div key={field.name} className="flex flex-col">
              <label className="mb-1 font-medium">{field.label}</label>
              <input
                name={field.name}
                placeholder={`Enter ${field.label}`}
                value={profile[field.name]}
                onChange={handleChange}
                className={`p-3 rounded-xl border text-lg transition outline-none 
                  border-gray-300 focus:ring-2 focus:ring-[#0D9488] 
                  dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 
                  dark:focus:ring-[#8B5CF6]`}
              />
            </div>
          ))}

          {/* Bio Section */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium">Bio / About</label>
            <textarea
              name="bio"
              rows="4"
              maxLength="250"
              value={profile.bio}
              onChange={handleChange}
              placeholder="Write a short description about yourself (max 250 chars)"
              className={`p-3 rounded-xl border text-lg transition outline-none resize-none
                border-gray-300 focus:ring-2 focus:ring-[#0D9488] 
                dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 
                dark:focus:ring-[#8B5CF6]`}
            />
            <div className="text-right text-sm opacity-70">
              {bioCount}/250 characters
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSave}
              disabled={loading}
              className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-lg font-semibold shadow-lg transition
                ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#0D9488] hover:bg-teal-700 dark:bg-[#8B5CF6] dark:hover:bg-violet-700 text-white"
                }`}
            >
              <FaSave />
              {loading ? "Saving..." : "Save Profile"}
            </motion.button>

            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleReset}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-lg font-semibold shadow-lg transition bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600"
            >
              <FaTimes /> Cancel
            </motion.button>
          </div>
        </form>
      )}

      {/* Message Toast */}
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
            className="mt-6 p-4 rounded-xl text-center font-medium 
              bg-gray-100 text-gray-800 
              dark:bg-gray-800 dark:text-gray-100 shadow-md"
          >
            {message}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
