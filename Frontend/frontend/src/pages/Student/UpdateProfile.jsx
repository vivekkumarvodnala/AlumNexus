import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa";

export default function UpdateProfile() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    image: "",
  });
  const [preview, setPreview] = useState(null); // For image preview
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const token = localStorage.getItem("token");

  // Fetch profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/users/get-profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFormData({
          name: res.data.name,
          phone: res.data.phone,
          image: res.data.image,
        });
        setPreview(res.data.image ? `http://localhost:8000${res.data.image}` : null);
      } catch (err) {
        console.error("❌ Error fetching profile:", err.response?.data || err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [token]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image selection
  const handleImageSelect = (e) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, image: file }));
    setPreview(URL.createObjectURL(file));
  };

  // Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setUploading(true);
      const data = new FormData();
      data.append("name", formData.name);
      data.append("phone", formData.phone);
      if (formData.image instanceof File) data.append("image", formData.image);

      const res = await axios.put(
        "http://localhost:8000/api/users/update-profile",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Profile updated successfully!");
      setFormData({
        name: res.data.name,
        phone: res.data.phone,
        image: res.data.image,
      });
      setPreview(res.data.image ? `http://localhost:8000${res.data.image}` : null);
    } catch (err) {
      console.error("❌ Error updating profile:", err.response?.data || err);
      alert("Failed to update profile.");
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold text-gray-600">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-white dark:bg-gray-900 shadow-xl rounded-3xl p-8 transition-all">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
        Update Profile
      </h2>

      {/* Profile Image */}
      <div className="flex flex-col items-center mb-6">
        <label className="cursor-pointer relative">
          <img
            src={preview || "https://www.w3schools.com/w3images/avatar2.png"}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-teal-500 dark:border-yellow-400 shadow-md"
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageSelect}
          />
          {uploading && (
            <span className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 text-white rounded-full font-semibold">
              Uploading...
            </span>
          )}
        </label>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-gray-700 dark:text-gray-200 mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent text-gray-800 dark:text-white focus:outline-none focus:border-teal-500 dark:focus:border-yellow-400 transition-colors"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-200 mb-1">Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent text-gray-800 dark:text-white focus:outline-none focus:border-teal-500 dark:focus:border-yellow-400 transition-colors"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-lg shadow-md transition"
          disabled={uploading}
        >
          {uploading ? "Updating..." : "Update Profile"}
        </button>
      </form>

      <a
        href="/dashboard"
        className="flex items-center justify-center gap-2 mt-6 text-teal-500 hover:underline"
      >
        <FaArrowLeft /> Back to Dashboard
      </a>
    </div>
  );
}
