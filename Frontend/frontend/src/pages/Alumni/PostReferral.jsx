// src/pages/Alumni/PostReferral.jsx
import React, { useState } from "react";
import {
  FaBriefcase,
  FaBuilding,
  FaUserTie,
  FaLink,
  FaMapMarkerAlt,
  FaClock,
  FaFileUpload,
} from "react-icons/fa";
import axios from "axios";
import {useAuth} from "../../context/AuthProvider";

export default function PostReferral() {
  const {user} = useAuth();
  if(!user || user.role !== "alumni") {
    return <p className="text-center text-red-500">Access Denied. Alumni only.</p>;
  }
  const [referral, setReferral] = useState({
    company: "",
    role: "",
    link: "",
    location: "",
    type: "Full-time",
    deadline: "",
    description: "",
  });

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(false);

  const handleChange = (e) =>
    setReferral({ ...referral, [e.target.name]: e.target.value });

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.entries(referral).forEach(([k, v]) => formData.append(k, v));
      if (file) formData.append("file", file);
      console.log(localStorage.getItem("token"));
      await axios.post("http://localhost:5000/api/referrals", formData, {
        headers: { "Content-Type": "multipart/form-data" },
          Authorization: `Bearer ${localStorage.getItem("token")}`,
      });

      alert("Referral posted successfully!");
      setReferral({
        company: "",
        role: "",
        link: "",
        location: "",
        type: "Full-time",
        deadline: "",
        description: "",
      });
      setFile(null);
      setPreview(false);
    } catch (err) {
      console.error(err);
      alert("Error posting referral. Try again.");
    }
  };

  // ✅ Ensure preview only works if required fields are filled
  const isValidForPreview =
    referral.company.trim() &&
    referral.role.trim() &&
    referral.link.trim();

  return (
    <div className="w-full max-w-2xl mx-auto bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg p-8 transition-colors duration-300">
      {/* Header */}
      <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-center text-[#0D9488] dark:text-yellow-400">
        <FaBriefcase className="text-[#0D9488] dark:text-yellow-400" />
        Post a Job Referral
      </h2>

      {/* === Show Preview OR Form === */}
      {preview && isValidForPreview ? (
        // ✅ Preview Card (instead of form)
        <div className="mt-6 p-4 border rounded-lg border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900">
          <h3 className="text-lg font-semibold text-[#0D9488] dark:text-yellow-400">
            {referral.role} at {referral.company}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {referral.location || "Location not specified"} • {referral.type}
          </p>
          <p className="mt-2 text-sm">{referral.description || "No description provided."}</p>
          {referral.deadline && (
            <p className="mt-1 text-xs text-red-500">
              Deadline: {referral.deadline}
            </p>
          )}
          <a
            href={referral.link}
            target="_blank"
            rel="noreferrer"
            className="text-[#0D9488] dark:text-yellow-400 hover:underline text-sm block mt-2"
          >
            Apply Here
          </a>
          {file && (
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              📎 Attached File: {file.name}
            </p>
          )}

          {/* Buttons */}
          <div className="flex gap-3 mt-4">
            <button
              type="button"
              onClick={() => setPreview(false)}
              className="px-4 py-2 rounded-lg border border-gray-400 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 transition"
            >
              Edit
            </button>
            <button
              onClick={handleSubmit}
              className="px-6 py-2 rounded-lg font-semibold text-white bg-[#0D9488] hover:bg-teal-700 dark:bg-yellow-400 dark:hover:bg-yellow-500 dark:text-black transition"
            >
              Submit Referral
            </button>
          </div>
        </div>
      ) : (
        // ✅ Form
        <form onSubmit={handleSubmit} className="grid gap-5">
          {/* Company */}
          <div className="flex items-center gap-3 border-b pb-2 border-gray-300 dark:border-gray-600">
            <FaBuilding className="text-gray-500 dark:text-yellow-400" />
            <input
              name="company"
              placeholder="Company Name"
              value={referral.company}
              onChange={handleChange}
              required
              className="flex-1 bg-transparent p-2 outline-none text-gray-900 dark:text-white"
            />
          </div>

          {/* Role */}
          <div className="flex items-center gap-3 border-b pb-2 border-gray-300 dark:border-gray-600">
            <FaUserTie className="text-gray-500 dark:text-yellow-400" />
            <input
              name="role"
              placeholder="Job Role"
              value={referral.role}
              onChange={handleChange}
              required
              className="flex-1 bg-transparent p-2 outline-none text-gray-900 dark:text-white"
            />
          </div>

          {/* Link */}
          <div className="flex items-center gap-3 border-b pb-2 border-gray-300 dark:border-gray-600">
            <FaLink className="text-gray-500 dark:text-yellow-400" />
            <input
              name="link"
              placeholder="Application Link"
              value={referral.link}
              onChange={handleChange}
              required
              className="flex-1 bg-transparent p-2 outline-none text-gray-900 dark:text-white"
            />
          </div>

          {/* Location & Type */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3 border-b pb-2 border-gray-300 dark:border-gray-600">
              <FaMapMarkerAlt className="text-gray-500 dark:text-yellow-400" />
              <input
                name="location"
                placeholder="Location (Remote/Onsite)"
                value={referral.location}
                onChange={handleChange}
                className="flex-1 bg-transparent p-2 outline-none text-gray-900 dark:text-white"
              />
            </div>

            <div className="flex items-center gap-3 border-b pb-2 border-gray-300 dark:border-gray-600">
              <FaBriefcase className="text-gray-500 dark:text-yellow-400" />
              <select
                name="type"
                value={referral.type}
                onChange={handleChange}
                className="flex-1 bg-transparent p-2 outline-none text-gray-900 dark:text-white"
              >
                <option>Full-time</option>
                <option>Internship</option>
                <option>Part-time</option>
                <option>Contract</option>
              </select>
            </div>
          </div>

          {/* Deadline */}
          <div className="flex items-center gap-3 border-b pb-2 border-gray-300 dark:border-gray-600">
            <FaClock className="text-gray-500 dark:text-yellow-400" />
            <input
              type="date"
              name="deadline"
              value={referral.deadline}
              onChange={handleChange}
              className="flex-1 bg-transparent p-2 outline-none text-gray-900 dark:text-white"
            />
          </div>

          {/* Description */}
          <textarea
            name="description"
            placeholder="Job Description (optional)"
            value={referral.description}
            onChange={handleChange}
            rows={4}
            className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent outline-none text-gray-900 dark:text-white"
          />

          {/* File Upload */}
          <label className="flex items-center gap-3 cursor-pointer text-gray-600 dark:text-gray-300">
            <FaFileUpload className="text-gray-500 dark:text-yellow-400" />
            <input type="file" onChange={handleFileChange} className="hidden" />
            <span className="text-sm">
              {file ? file.name : "Upload Job PDF (optional)"}
            </span>
          </label>

          {/* Preview Button */}
          <button
            type="button"
            disabled={!isValidForPreview}
            onClick={() => isValidForPreview && setPreview(true)}
            className={`px-6 py-2 rounded-lg font-semibold text-white transition ${
              isValidForPreview
                ? "bg-[#0D9488] hover:bg-teal-700 dark:bg-yellow-400 dark:hover:bg-yellow-500 dark:text-black"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Preview Referral
          </button>
        </form>
      )}
    </div>
  );
}
