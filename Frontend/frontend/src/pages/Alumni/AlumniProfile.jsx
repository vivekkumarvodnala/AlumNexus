import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaEnvelope,
  FaPhone,
  FaUserGraduate,
  FaCalendarAlt,
  FaEdit,
  FaHome,
  FaList,
  FaCog,
} from "react-icons/fa";

export default function StudentProfile() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    image: "", // store image URL here
    role: "",
    email: "",
    createdAt: "",
  });
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const token = localStorage.getItem("token");

  // Fetch profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/users/get-profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFormData(res.data); // populate formData state
      } catch (err) {
        console.error("❌ Error fetching profile:", err.response?.data || err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  // Handle input changes (name, phone)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image upload
  const handleImageUpload = async (e) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];

    try {
      setUploading(true);

      // For simplicity, you can use FormData here
      const data = new FormData();
      data.append("image", file);
      data.append("name", formData.name);
      data.append("phone", formData.phone);

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

      setFormData(res.data); // update formData with new profile
    } catch (err) {
      console.error("❌ Error uploading image:", err.response?.data || err);
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
<div className="bg-white dark:bg-gray-900 shadow-2xl rounded-3xl p-8 max-w-lg mx-auto w-full transition-all">
  {/* Profile Image and Name */}
  <div className="flex flex-col items-center relative mb-8">
    <label className="cursor-pointer relative">
      <img
        src={
          formData.image
            ? `http://localhost:8000${formData.image}`
            : "https://www.w3schools.com/w3images/avatar2.png"
        }
        alt="Profile"
        className="w-32 h-32 rounded-full object-cover border-4 border-[#900000] dark:border-yellow-400 shadow-md"
      />
      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageUpload}
      />
      {uploading && (
        <span className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 text-white rounded-full font-semibold">
          Uploading...
        </span>
      )}
    </label>

    <input
      type="text"
      name="name"
      value={formData.name}
      onChange={handleChange}
      className="mt-4 text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white text-center w-full bg-transparent border-b border-gray-300 dark:border-gray-600 focus:outline-none focus:border-[#900000] dark:focus:border-yellow-400 transition-colors"
    />
    <p className="text-[#8B5CF6] dark:text-yellow-400 font-medium capitalize mt-1">
      {formData.role}
    </p>
  </div>

  {/* Tasks / Info Section */}
  <div className="space-y-6">
    {/* Profile Info */}
    <div className="flex flex-col gap-3">
      <div className="flex items-center text-gray-700 dark:text-gray-200 gap-3">
        <FaEnvelope className="text-[#900000] dark:text-yellow-400" />
        <span>{formData.email}</span>
      </div>
      <div className="flex items-center text-gray-700 dark:text-gray-200 gap-3">
        <FaPhone className="text-[#219000] dark:text-yellow-400" />
        <input
          type="text"
          name="phone"
          value={formData.phone || ""}
          onChange={handleChange}
          className="bg-transparent focus:outline-none border-b border-gray-300 dark:border-gray-600 focus:border-[#219000] dark:focus:border-yellow-400 w-full transition-colors"
        />
      </div>
      <div className="flex items-center text-gray-700 dark:text-gray-200 gap-3">
        <FaUserGraduate className="text-[#900000] dark:text-yellow-400" />
        <span>{formData.role}</span>
      </div>
      <div className="flex items-center text-gray-700 dark:text-gray-200 gap-3">
        <FaCalendarAlt className="text-[#8B5CF6] dark:text-yellow-400" />
        <span>Joined: {new Date(formData.createdAt).toLocaleDateString()}</span>
      </div>
    </div>


    {/* Team members */}
    <div>
      <h3 className="text-gray-700 dark:text-gray-200 font-semibold mb-2">Works most with:</h3>
      <div className="flex -space-x-4">
        {["Joe", "Dylan", "Ethan", "Louis", "Jacob", "Julia"].map((name, idx) => (
          <div
            key={idx}
            className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-900 overflow-hidden"
            title={name}
          >
            <img src={`https://i.pravatar.cc/40?img=${idx + 1}`} alt={name} className="object-cover w-full h-full" />
          </div>
        ))}
      </div>
    </div>
  </div>

  {/* Navigation Buttons */}
  <div className="mt-8 grid grid-cols-2 gap-4">
    <a
      href="/student-dashboard"
      className="flex items-center justify-center gap-2 bg-[#900000] hover:bg-[#780000] text-white py-2 rounded-lg shadow-md transition"
    >
      <FaHome /> Dashboard
    </a>
    <a
      href="/orders"
      className="flex items-center justify-center gap-2 bg-[#219000] hover:bg-[#1a7000] text-white py-2 rounded-lg shadow-md transition"
    >
      <FaList /> Orders
    </a>
    <a
      className="flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-800 text-white py-2 rounded-lg shadow-md transition"
    >
      <FaCog /> Settings
    </a>
    <a
      href="/student/update-profile"
      className="flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-white py-2 rounded-lg shadow-md transition"
    >
      <FaEdit /> Update Profile
    </a>
  </div>
</div>
  );
}
