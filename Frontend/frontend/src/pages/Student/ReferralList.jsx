import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaBriefcase, FaBuilding, FaClock, FaMapMarkerAlt } from "react-icons/fa";

export default function ReferralList() {
  const [referrals, setReferrals] = useState([]);

  useEffect(() => {
    const fetchReferrals = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/referrals", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setReferrals(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchReferrals();
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-[#0D9488] dark:text-yellow-400 flex items-center gap-2">
        <FaBriefcase className="text-[#0D9488] dark:text-yellow-400" />
        Available Referrals
      </h2>

      {referrals.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300">No referrals posted yet.</p>
      ) : (
        <div className="grid gap-6">
          {referrals.map((r) => (
            <div
              key={r._id}
              className="p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-md bg-white dark:bg-[#111827] transition"
            >
              <h3 className="text-lg font-semibold text-[#0D9488] dark:text-yellow-400">
                {r.role} at {r.company}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-2">
                <FaMapMarkerAlt /> {r.location || "Not specified"} • {r.type}
              </p>
              {r.deadline && (
                <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                  <FaClock /> Deadline: {new Date(r.deadline).toLocaleDateString()}
                </p>
              )}
              <p className="mt-2 text-sm">{r.description || "No description provided."}</p>

              <a
                href={r.link}
                target="_blank"
                rel="noreferrer"
                className="inline-block mt-3 text-sm font-semibold text-[#0D9488] dark:text-yellow-400 hover:underline"
              >
                Apply Here
              </a>

              {r.file && (
                <a
                  href={`http://localhost:5000/uploads/referrals/${r.file}`}
                  target="_blank"
                  rel="noreferrer"
                  className="block mt-2 text-xs text-gray-500 dark:text-gray-400 hover:underline"
                >
                  📎 View Attached File
                </a>
              )}

              <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                Posted by {r.postedBy?.name || "Alumni"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
