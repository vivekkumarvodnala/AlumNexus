// src/pages/Student/ResourceBank.jsx
import React, { useState } from "react";
import { FileText, ExternalLink } from "lucide-react";

export default function ResourceBank() {
  const branches = ["CSE", "ECE", "EEE", "MECH", "CIVIL", "CHEM", "MME"];
  const [activeBranch, setActiveBranch] = useState("CSE");

  // Dummy resources data
  const resources = {
    CSE: [
      {
        id: 1,
        title: "Data Structures Notes",
        type: "PDF",
        link: "#",
        uploader: "Ravi Kumar (CSE '19)",
      },
      {
        id: 2,
        title: "System Design Handbook",
        type: "DOC",
        link: "#",
        uploader: "Anjali Sharma (CSE '18)",
      },
    ],
    ECE: [
      {
        id: 3,
        title: "VLSI Design",
        type: "PDF",
        link: "#",
        uploader: "Pranav Reddy (ECE '17)",
      },
    ],
    MECH: [
      {
        id: 4,
        title: "Thermodynamics Basics",
        type: "PPT",
        link: "#",
        uploader: "Meena Iyer (MECH '20)",
      },
    ],
    // Other branches can be filled similarly
  };

  return (
    <div className="min-h-screen bg-bg dark:bg-accent px-6 py-8">
      <h1 className="text-2xl font-bold text-accent dark:text-gray-100 mb-6">
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
                ? "bg-primary text-white"
                : "bg-gray-200 dark:bg-gray-700 text-accent dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            {branch}
          </button>
        ))}
      </div>

      {/* Resources List */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {(resources[activeBranch] || []).map((res) => (
          <div
            key={res.id}
            className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm p-5 hover:shadow-md transition"
          >
            <div className="flex items-center gap-3 mb-3">
              <FileText className="w-6 h-6 text-primary" />
              <h2 className="font-semibold text-accent dark:text-gray-100">
                {res.title}
              </h2>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
              Uploaded by {res.uploader}
            </p>
            <span className="inline-block px-2 py-1 text-xs rounded bg-secondary/10 text-secondary mb-3">
              {res.type}
            </span>
            <a
              href={res.link}
              className="flex items-center gap-2 text-sm font-medium text-primary hover:underline"
            >
              View Resource <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        ))}
      </div>

      {/* No Resources */}
      {(!resources[activeBranch] || resources[activeBranch].length === 0) && (
        <p className="text-gray-500 dark:text-gray-400 text-center mt-10">
          No resources available for {activeBranch}.
        </p>
      )}
    </div>
  );
}
