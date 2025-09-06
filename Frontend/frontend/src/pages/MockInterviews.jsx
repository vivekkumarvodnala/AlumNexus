import { useState } from "react";
import {
  FaUserTie,
  FaCalendarAlt,
  FaClock,
  FaLaptop,
  FaBuilding,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

function MockInterviews() {
  // Example data (replace later with backend API)
  const [interviews] = useState([
    {
      id: 1,
      alumni: "Anonymous Alumni",
      role: "Software Engineer",
      company: "Google",
      date: "2025-09-10",
      time: "6:00 PM",
      mode: "Online",
      status: "Open",
    },
    {
      id: 2,
      alumni: "Anonymous Alumni",
      role: "Data Scientist",
      company: "Amazon",
      date: "2025-09-12",
      time: "5:00 PM",
      mode: "Online",
      status: "Open",
    },
    {
      id: 3,
      alumni: "Anonymous Alumni",
      role: "System Design Expert",
      company: "Microsoft",
      date: "2025-09-15",
      time: "7:00 PM",
      mode: "Offline",
      status: "Filled",
    },
  ]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white px-6 md:px-16 py-10">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-5xl font-bold flex items-center justify-center gap-3 text-primary dark:text-white">
          <FaUserTie className="dark:text-yellow-400" /> Mock Interviews
        </h1>
        <p className="mt-4 text-lg max-w-2xl mx-auto">
          Practice with real alumni! Book a session and get valuable feedback on
          your interview skills.
        </p>
      </div>

      {/* Interview Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {interviews.length > 0 ? (
          interviews.map((session) => (
            <div
              key={session.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 flex flex-col justify-between"
            >
              {/* Role & Company */}
              <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
                <FaUserTie className="text-primary dark:text-yellow-400" />
                {session.role}
              </h2>
              <p className="flex items-center gap-2 text-gray-600 dark:text-white mb-4">
                <FaBuilding className="dark:text-yellow-400" /> {session.company}
              </p>

              {/* Details */}
              <div className="space-y-2 text-sm mb-4">
                <p className="flex items-center gap-2">
                  <FaCalendarAlt className="dark:text-yellow-400" />
                  <span>{session.date}</span>
                </p>
                <p className="flex items-center gap-2">
                  <FaClock className="dark:text-yellow-400" />
                  <span>{session.time}</span>
                </p>
                <p className="flex items-center gap-2">
                  <FaLaptop className="dark:text-yellow-400" />
                  <span>{session.mode}</span>
                </p>
              </div>

              {/* Status */}
              <div className="flex items-center justify-between mt-auto">
                <span
                  className={`flex items-center gap-1 text-sm font-semibold ${
                    session.status === "Open"
                      ? "text-green-600 dark:text-white"
                      : "text-red-500 dark:text-white"
                  }`}
                >
                  {session.status === "Open" ? (
                    <FaCheckCircle className="dark:text-yellow-400" />
                  ) : (
                    <FaTimesCircle className="dark:text-yellow-400" />
                  )}
                  {session.status}
                </span>

                <button
                  disabled={session.status !== "Open"}
                  className={`px-4 py-2 rounded-lg text-white transition ${
                    session.status === "Open"
                      ? "bg-primary hover:bg-opacity-90 dark:bg-yellow-400 dark:text-gray-900"
                      : "bg-gray-400 cursor-not-allowed dark:bg-yellow-400 dark:text-gray-900"
                  }`}
                >
                  {session.status === "Open" ? "Request Slot" : "Unavailable"}
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center">
            No mock interviews are available at the moment.
          </p>
        )}
      </div>
    </div>
  );
}

export default MockInterviews;
