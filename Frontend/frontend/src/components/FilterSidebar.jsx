import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaUserGraduate,
  FaUsers,
  FaUserTie,
} from "react-icons/fa";

function FilterSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [openRole, setOpenRole] = useState(null);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    setOpenRole(null);
  };

  const toggleRole = (role) => {
    setOpenRole(openRole === role ? null : role);
  };

  return (
    <>
      {/* Hamburger button */}
      <button
        onClick={toggleSidebar}
        className="fixed  z-50 p-3 bg-black text-white rounded-md shadow-md hover:bg-gray-800"
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-gray-900 text-white p-6 transform transition-transform duration-300 z-40
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <h2 className="text-xl font-bold mb-6">Menu</h2>

        <ul className="space-y-4">
          {/* Student */}
          <li>
            <button
              onClick={() => toggleRole("student")}
              className="flex items-center gap-2 w-full text-left hover:text-yellow-400"
            >
              <FaUserGraduate /> Student
            </button>
            {openRole === "student" && (
              <ul className="ml-6 mt-2 space-y-2 text-sm text-gray-300">
                <li><Link to="/student/dashboard" onClick={toggleSidebar}>Dashboard</Link></li>
                <li><Link to="/student/alumni-directory" onClick={toggleSidebar}>Alumni Directory</Link></li>
                <li><Link to="/student/job-referrals" onClick={toggleSidebar}>Job Referrals</Link></li>
                <li><Link to="/student/interview-experiences" onClick={toggleSidebar}>Interview Experiences</Link></li>
                <li><Link to="/student/success-stories" onClick={toggleSidebar}>Success Stories</Link></li>
                <li><Link to="/student/resource-bank" onClick={toggleSidebar}>Resource Bank</Link></li>
                <li><Link to="/student/company-reviews" onClick={toggleSidebar}>Company Reviews</Link></li>
                <li><Link to="/student/chat-alumni" onClick={toggleSidebar}>Chat Alumni</Link></li>
                <li><Link to="/student/mock-interview" onClick={toggleSidebar}>Mock Interview Scheduler</Link></li>
                <li><Link to="/student/text-to-speech" onClick={toggleSidebar}>Text to Speech</Link></li>
              </ul>
            )}
          </li>

          {/* Alumni */}
          <li>
            <button
              onClick={() => toggleRole("alumni")}
              className="flex items-center gap-2 w-full text-left hover:text-yellow-400"
            >
              <FaUsers /> Alumni
            </button>
            {openRole === "alumni" && (
              <ul className="ml-6 mt-2 space-y-2 text-sm text-gray-300">
                <li><Link to="/alumni/alumni-profile-page" onClick={toggleSidebar}>Profile</Link></li>
                <li><Link to="/alumni/alumni-dashboard" onClick={toggleSidebar}>Dashboard</Link></li>
                <li><Link to="/alumni/manage-profile" onClick={toggleSidebar}>Manage Profile</Link></li>
                <li><Link to="/alumni/post-referral" onClick={toggleSidebar}>Post Referral</Link></li>
                <li><Link to="/alumni/post-experience" onClick={toggleSidebar}>Post Experience</Link></li>
                <li><Link to="/alumni/post-story" onClick={toggleSidebar}>Post Story</Link></li>
                <li><Link to="/alumni/post-resource" onClick={toggleSidebar}>Post Resource</Link></li>
                <li><Link to="/alumni/post-review" onClick={toggleSidebar}>Post Review</Link></li>
              </ul>
            )}
          </li>

          {/* Admin */}
          <li>
            <button
              onClick={() => toggleRole("admin")}
              className="flex items-center gap-2 w-full text-left hover:text-yellow-400"
            >
              <FaUserTie /> Admin
            </button>
            {openRole === "admin" && (
              <ul className="ml-6 mt-2 space-y-2 text-sm text-gray-300">
                <li><Link to="/admin/admin-dashboard" onClick={toggleSidebar}>Dashboard</Link></li>
                <li><Link to="/admin/user-management" onClick={toggleSidebar}>User Management</Link></li>
                <li><Link to="/admin/content-moderation" onClick={toggleSidebar}>Content Moderation</Link></li>
                <li><Link to="/admin/analytics-dashboard" onClick={toggleSidebar}>Analytics Dashboard</Link></li>
                <li><Link to="/admin/role-conversion" onClick={toggleSidebar}>Role Conversion</Link></li>
              </ul>
            )}
          </li>
        </ul>
      </aside>
    </>
  );
}

export default FilterSidebar;
