import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaMoon,
  FaSun,
  FaUsers,
  FaPodcast,
  FaSignOutAlt,
  FaHome,
  FaUserTie,
  FaInfoCircle,
  FaBars,
  FaTimes,
  FaSignInAlt,
  FaUserPlus,
  FaBriefcase,
  FaCheckCircle,
  FaBuilding,
  FaComments,
  FaCalendarCheck,
  FaHeadphones,
  FaUserShield,
  FaBook,
} from "react-icons/fa";
import { useTheme } from "../context/ThemeProvider";
import { useAuth } from "../context/AuthProvider";

function Navbar() {
  const { darkMode, setDarkMode } = useTheme();
  const { user,logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  // ================= Public Links =================
  const publicLinks = [
    { to: "/", label: "Home", icon: <FaHome /> },
    { to: "/podcasts", label: "Podcasts", icon: <FaPodcast /> },
    { to: "/mock-interviews", label: "Mock Interviews", icon: <FaUserTie /> },
    { to: "/community", label: "Community", icon: <FaUsers /> },
    { to: "/about", label: "About", icon: <FaInfoCircle /> },
    { to: "/login", label: "Login", icon: <FaSignInAlt /> },
    { to: "/register", label: "Register", icon: <FaUserPlus /> },
  ];

  // ================= Student Links =================
  const studentLinks = [
    { to: "/student/student-dashboard", label: "Dashboard", icon: <FaHome /> },
    { to: "/student/alumni-directory", label: "Alumni Directory", icon: <FaUsers /> },
    { to: "/student/job-referrals", label: "Job Referrals", icon: <FaBriefcase /> },
    { to: "/student/interview-experiences", label: "Interview Experiences", icon: <FaUserTie /> },
    { to: "/student/success-stories", label: "Success Stories", icon: <FaCheckCircle /> },
    { to: "/student/resource-bank", label: "Resources", icon: <FaBook /> },
    { to: "/student/company-reviews", label: "Company Reviews", icon: <FaBuilding /> },
    { to: "/student/chat-alumni", label: "Chat Alumni", icon: <FaComments /> },
    { to: "/student/mock-interviews", label: "Mock Interviews", icon: <FaCalendarCheck /> },
    { to: "/student/text-to-speech", label: "Text to Speech", icon: <FaHeadphones /> },
    { to: "/student/create-interview", label: "Create Interview", icon: <FaCalendarCheck /> },
  ];

  // ================= Alumni Links =================
  const alumniLinks = [
    { to: "/alumni/dashboard", label: "Dashboard", icon: <FaHome /> },
    { to: "/alumni/manage-profile", label: "Manage Profile", icon: <FaUserTie /> },
    { to: "/alumni/post-referral", label: "Post Referral", icon: <FaBriefcase /> },
    { to: "/alumni/post-experience", label: "Post Experience", icon: <FaUserTie /> },
    { to: "/alumni/post-story", label: "Post Story", icon: <FaCheckCircle /> },
    { to: "/alumni/post-resource", label: "Post Resource", icon: <FaBook /> },
    { to: "/alumni/post-review", label: "Post Review", icon: <FaBuilding /> },
  ];

  // ================= Admin Links =================
  const adminLinks = [
    { to: "/admin/dashboard", label: "Dashboard", icon: <FaHome /> },
    { to: "/admin/user-management", label: "User Management", icon: <FaUsers /> },
    { to: "/admin/content-moderation", label: "Content Moderation", icon: <FaComments /> },
    { to: "/admin/analytics-dashboard", label: "Analytics", icon: <FaPodcast /> },
    { to: "/admin/role-conversion", label: "Role Conversion", icon: <FaUserShield /> },
  ];

  const roleLinks = !user
    ? publicLinks
    : user.role === "student"
    ? studentLinks
    : user.role === "alumni"
    ? alumniLinks
    : user.role === "admin"
    ? adminLinks
    : [];

  return (
    <nav className="w-full border-b border-gray-300 dark:border-gray-600 bg-primary text-white px-6 py-2 shadow-md dark:bg-gray-900 transition-colors duration-300">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <h1 className="dark:hover:text-yellow-300 text-xl md:text-2xl font-bold">🎓 Alumnexus</h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          {roleLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="dark:hover:text-yellow-300 flex items-center gap-2"
            >
              <span className="dark:text-yellow-400">{link.icon}</span> {link.label}
            </Link>
          ))}

          {/* Greeting */}
          {user && <span className="ml-3 text-sm opacity-80">Hi, {user.name}</span>}

          {/* Theme Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="ml-4 p-2 rounded-full bg-white/20 hover:bg-white/30 transition"
            title="Toggle theme"
          >
            {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon />}
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden p-2 rounded focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden mt-3 flex flex-col space-y-4 bg-primary dark:bg-gray-800 px-6 py-4 rounded-lg shadow-lg">
          {roleLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="hover:text-yellow-400 flex items-center gap-2"
              onClick={() => setMenuOpen(false)}
            >
              <span className="dark:text-yellow-400">{link.icon}</span> {link.label}
            </Link>
          ))}

          {user && <span className="text-sm opacity-80">Hi, {user.name}</span>}

          {/* Theme Toggle Mobile */}
          <button
            onClick={() => {
              setDarkMode(!darkMode);
              setMenuOpen(false);
            }}
            className="mt-2 p-2 rounded-full bg-white/20 hover:bg-white/30 transition w-fit"
            title="Toggle theme"
          >
            {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon />}
          </button>
        </div>
      )}
       {user && (
        <button
          onClick={logout}
          className="flex items-center gap-2 px-3 py-1 rounded-lg bg-red-600 text-white hover:bg-red-500"
        >
          <FaSignOutAlt /> Logout
        </button>
      )}
    </nav>
  );
}

export default Navbar;
