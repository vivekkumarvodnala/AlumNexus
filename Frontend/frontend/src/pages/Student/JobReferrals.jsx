// src/pages/Student/JobReferrals.jsx
import React, { useEffect, useState } from "react";
import { MessageCircle, Bookmark, Shield } from "lucide-react";
import axios from "axios";
import { useAuth } from "../../context/AuthProvider";

export default function JobReferrals() {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReferrals = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/referrals", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setJobs(res.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchReferrals();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading referrals...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">Error: {error.message}</p>;
  if (jobs.length === 0)
    return <p className="text-center mt-10 text-gray-500">No job referrals yet.</p>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-6 py-8">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-yellow-400 mb-8">
        Job Referrals
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        {jobs.map((job) => (
          <div
            key={job._id}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg p-5 hover:shadow-2xl transition"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-yellow-400">
                {job.role} @ {job.company}
              </h2>
              {job.verified && <Shield className="w-5 h-5 text-yellow-400" />}
            </div>

            {/* Author & Info */}
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 mb-3">
              <img
                src={`https://i.pravatar.cc/150?img=${job.postedBy._id.slice(0, 2)}`}
                alt={job.postedBy.name}
                className="w-8 h-8 rounded-full border border-gray-200 dark:border-gray-600"
              />
              <div>
                <p className="font-semibold">{job.postedBy.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{job.postedBy.batch || "Alumni"}</p>
              </div>
            </div>

            {/* Job Type & Location */}
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="px-2 py-1 bg-teal-100 text-teal-800 rounded-full text-xs dark:bg-teal-900 dark:text-teal-200">
                {job.type}
              </span>
              {job.location && (
                <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs dark:bg-gray-700 dark:text-gray-200">
                  {job.location}
                </span>
              )}
              {job.deadline && (
                <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs dark:bg-red-900 dark:text-red-200">
                  Deadline: {job.deadline}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
              {job.description || "No description provided."}
            </p>

            {/* Links & File */}
            <div className="flex flex-col gap-2 mb-4">
              {job.link && (
                <a
                  href={job.link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-teal-600 dark:text-yellow-400 hover:underline text-sm"
                >
                  Apply Here
                </a>
              )}
              {job.file && (
                <a
                  href={`http://localhost:8000/uploads/referrals/${job.file}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-500 dark:text-gray-400 text-xs hover:underline"
                >
                  📎 Download Attachment
                </a>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-6 text-gray-500 dark:text-gray-400 text-sm">
              <div className="flex items-center gap-1 cursor-pointer hover:text-teal-600 dark:hover:text-yellow-300">
                <MessageCircle className="w-4 h-4" /> 0
              </div>
              <div className="flex items-center gap-1 cursor-pointer hover:text-teal-600 dark:hover:text-yellow-300">
                <Bookmark className="w-4 h-4" /> 0
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
