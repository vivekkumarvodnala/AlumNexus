// src/pages/Student/ResourceBank.jsx
import React, { useEffect, useState } from "react";
import { FileText, ExternalLink } from "lucide-react";
import axios from "axios";
import { useAuth } from "../../context/AuthProvider";

export default function ResourceBank() {
  const { user } = useAuth();
  const branches = ["CSE", "ECE", "EEE", "MECH", "CIVIL", "CHEM", "MME"];
  const [activeBranch, setActiveBranch] = useState("CSE");
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/resources", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log("Resources fetched:", res.data);
        setResources(res.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, []);

  // Case-insensitive branch filter
  const filteredResources = resources.filter(
    (r) => r.branch?.toLowerCase() === activeBranch.toLowerCase()
  );

  if (loading) return <p className="text-center mt-10">Loading resources...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error.message}</p>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-6 py-8">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-yellow-400 mb-8">
        Resource Bank
      </h1>

      {/* Branch Tabs */}
      <div className="flex flex-wrap gap-3 mb-6">
        {branches.map((branch) => (
          <button
            key={branch}
            onClick={() => setActiveBranch(branch)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              activeBranch === branch
                ? "bg-teal-600 text-white dark:bg-yellow-400 dark:text-black"
                : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            {branch}
          </button>
        ))}
      </div>

      {/* Resource Grid */}
      {filteredResources.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredResources.map((res) => (
            <div
              key={res._id}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm p-5 hover:shadow-md transition"
            >
              <div className="flex items-center gap-3 mb-3">
                <FileText className="w-6 h-6 text-teal-600 dark:text-yellow-400" />
                <h2 className="font-semibold text-gray-900 dark:text-yellow-400">{res.bookName}</h2>
              </div>

              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                Uploaded by {res.uploadedBy?.name || "Unknown"}
              </p>

              <span className="inline-block px-2 py-1 text-xs rounded bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 mb-3">
                {res.type || "FILE"}
              </span>

              {res.file ? (
                <a
                  href={`http://localhost:8000/uploads/resources/${res.file}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-sm font-medium text-teal-600 dark:text-yellow-400 hover:underline"
                >
                  View Resource <ExternalLink className="w-4 h-4" />
                </a>
              ) : (
                <p className="text-red-500 text-sm">File not available</p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 dark:text-gray-400 text-center mt-10">
          No resources available for {activeBranch}.
        </p>
      )}
    </div>
  );
}
