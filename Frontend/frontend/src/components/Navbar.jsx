// src/components/Navbar.jsx
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaMoon,
  FaSun,
  FaUsers,
  FaPodcast,
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
  FaUserShield,
  FaBook,
  FaSignOutAlt,
} from "react-icons/fa";
import { useTheme } from "../context/ThemeProvider";
import { useAuth } from "../context/AuthProvider";

function Navbar() {
  const { darkMode, setDarkMode } = useTheme();
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef(null);
  const navigate = useNavigate();
  // close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (moreRef.current && !moreRef.current.contains(e.target)) {
        setMoreOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // close everything when one opens
  const toggleMenu = () => {
    setMenuOpen((prev) => {
      if (!prev) setMoreOpen(false);
      return !prev;
    });
  };
  const toggleMore = () => {
    setMoreOpen((prev) => {
      if (!prev) setMenuOpen(false);
      return !prev;
    });
  };

  // ================= Public Links =================
  const publicLinks = [
    {
      to: "/",
      label: "Home",
      icon: <FaHome className="dark:text-yellow-400" />,
    },
    {
      to: "/podcasts",
      label: "Podcasts",
      icon: <FaPodcast className="dark:text-yellow-400" />,
    },
    {
      to: "/mock-interviews",
      label: "Mock Interviews",
      icon: <FaUserTie className="dark:text-yellow-400" />,
    },
    {
      to: "/community",
      label: "Community",
      icon: <FaUsers className="dark:text-yellow-400" />,
    },
    {
      to: "/about",
      label: "About",
      icon: <FaInfoCircle className="dark:text-yellow-400" />,
    },
    {
      to: "/login",
      label: "Login",
      icon: <FaSignInAlt className="dark:text-yellow-400" />,
    },
    {
      to: "/register",
      label: "Register",
      icon: <FaUserPlus className="dark:text-yellow-400" />,
    },
  ];

  // ================= Student Links =================
  const studentLinks = [
    {
      to: "/student/student-profile",
      label: "Profile",
      icon: <FaHome className="dark:text-yellow-400" />,
    },
    {
      to: "/student/student-dashboard",
      label: "Dashboard",
      icon: <FaHome className="dark:text-yellow-400" />,
    },
    {
      to: "/student/job-referrals",
      label: "Job Referrals",
      icon: <FaBriefcase className="dark:text-yellow-400" />,
    },
    {
      to: "/student/success-stories",
      label: "Success Stories",
      icon: <FaCheckCircle className="dark:text-yellow-400" />,
    },
    {
      to: "/student/resource-bank",
      label: "Resources",
      icon: <FaBook className="dark:text-yellow-400" />,
    },
    {
      to: "/users",
      label: "Chat Alumni",
      icon: <FaComments className="dark:text-yellow-400" />,
    },
    {
      to: "/student/mock-interviews",
      label: "Mock Interviews",
      icon: <FaCalendarCheck className="dark:text-yellow-400" />,
    },
  ];

  const studentDirectLabels = [
    "Profile",
    "Dashboard",
    "Mock Interviews",
    "Podcasts",
    "Chat Alumni",
  ];
  const studentDirectLinks = studentLinks.filter((link) =>
    studentDirectLabels.includes(link.label)
  );
  const studentMoreLinks = studentLinks.filter(
    (link) => !studentDirectLabels.includes(link.label)
  );

  // ================= Alumni Links =================
  const alumniLinks = [
    {
      to: "/alumni/alumni-profile",
      label: "Profile",
      icon: <FaUserTie className="dark:text-yellow-400" />,
    },
    {
      to: "/alumni/alumni-dashboard",
      label: "Dashboard",
      icon: <FaHome className="dark:text-yellow-400" />,
    },
    {
      to: "/alumni/create-interview",
      label: "Register Mock Interview",
      icon: <FaCalendarCheck className="dark:text-yellow-400" />,
    },
    {
      to: "/alumni/upload-podcast",
      label: "Upload Podcast",
      icon: <FaBook className="dark:text-yellow-400" />,
    },
    {
      to: "/users",
      label: "Chat Students",
      icon: <FaComments className="dark:text-yellow-400" />,
    },
    {
      to: "/alumni/my-podcasts",
      label: "MyPodcasts",
      icon: <FaCheckCircle className="dark:text-yellow-400" />,
    },
    {
      to: "/alumni/my-slots",
      label: "MyInterviews",
      icon: <FaCheckCircle className="dark:text-yellow-400" />,
    },
    {
      to: "/alumni/post-referral",
      label: "Post Referral",
      icon: <FaBriefcase className="dark:text-yellow-400" />,
    },
    {
      to: "/alumni/post-experience",
      label: "Post Experience",
      icon: <FaUserTie className="dark:text-yellow-400" />,
    },
    {
      to: "/alumni/post-story",
      label: "Post Story",
      icon: <FaCheckCircle className="dark:text-yellow-400" />,
    },
    {
      to: "/alumni/post-resource",
      label: "Post Resource",
      icon: <FaBook className="dark:text-yellow-400" />,
    },
    {
      to: "/alumni/post-review",
      label: "Post Review",
      icon: <FaBuilding className="dark:text-yellow-400" />,
    },
  ];

  const alumniDirectLabels = [
    "Profile",
    "Dashboard",
    "Register Mock Interview",
    "Upload Podcast",
    "Chat Students",
  ];
  const alumniDirectLinks = alumniLinks.filter((link) =>
    alumniDirectLabels.includes(link.label)
  );
  const alumniMoreLinks = alumniLinks.filter(
    (link) => !alumniDirectLabels.includes(link.label)
  );

  // ================= Admin Links =================
  const adminLinks = [
    {
      to: "/admin/admin-profile",
      label: "Dashboard",
      icon: <FaHome className="dark:text-yellow-400" />,
    },
    {
      to: "/admin/user-management",
      label: "User Management",
      icon: <FaUsers className="dark:text-yellow-400" />,
    },
    {
      to: "/admin/content-moderation",
      label: "Content Moderation",
      icon: <FaComments className="text-yellow-400" />,
    },
    {
      to: "/admin/analytics-dashboard",
      label: "Analytics",
      icon: <FaPodcast className="dark:text-yellow-400" />,
    },
    {
      to: "/admin/role-conversion",
      label: "Role Conversion",
      icon: <FaUserShield className="dark:text-yellow-400" />,
    },
  ];

  // ================= Role-based Links =================
  let directLinks = [];
  let moreLinks = [];

  if (!user) {
    directLinks = publicLinks;
    moreLinks = [];
  } else if (user.role === "student") {
    directLinks = studentDirectLinks;
    moreLinks = studentMoreLinks;
  } else if (user.role === "alumni") {
    directLinks = alumniDirectLinks;
    moreLinks = alumniMoreLinks;
  } else if (user.role === "admin") {
    directLinks = adminLinks;
    moreLinks = [];
  }
  const handleLogout = () => {
  logout();                 // clear auth
  setMenuOpen(false);       // close sidebar
  setMoreOpen(false);       // close dropdown
  navigate("/", { replace: true }); // force redirect to homepage
};
  return (
    <nav className="w-full border-b border-gray-300 bg-primary dark:border-gray-600 dark:bg-gray-900 text-white px-4 py-2 shadow-md transition-colors duration-300">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <h1 className="dark:dark:hover:text-yellow-300 text-lg md:text-xl font-bold">
          🎓 AlumNexus
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-4 relative">
          {directLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="dark:hover:text-yellow-300 flex items-center gap-1"
            >
              {link.icon} <span>{link.label}</span>
            </Link>
          ))}

          {/* More Dropdown */}
          {moreLinks.length > 0 && (
            <div className="relative" ref={moreRef}>
              <button
                onClick={toggleMore}
                className="flex items-center gap-1 dark:hover:text-yellow-300"
              >
                More <span className="ml-1">{moreOpen ? "▲" : "▼"}</span>
              </button>
              {moreOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-primary dark:bg-gray-900 text-white rounded-md shadow-lg py-2 z-50">
                  {moreLinks.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className="flex items-center gap-2 px-4 py-2 hover:bg-gray-800 dark:hover:text-yellow-300"
                      onClick={() => setMoreOpen(false)}
                    >
                      {link.icon} {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Logout */}
          {user && (
            <button
              onClick={handleLogout}
              className="ml-3 flex items-center gap-1 text-sm dark:hover:text-yellow-300"
            >
              <FaSignOutAlt className="dark:text-yellow-400" /> Logout
            </button>
          )}

          {/* Theme Toggle */}
          <button
            onClick={() => {
              setDarkMode(!darkMode);
              setMoreOpen(false);
              setMenuOpen(false);
            }}
            className="ml-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
            title="Toggle theme"
          >
            {darkMode ? (
              <FaSun className="dark:text-yellow-400" />
            ) : (
              <FaMoon className="dark:text-yellow-400" />
            )}
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden p-2 rounded focus:outline-none"
          onClick={toggleMenu}
        >
          {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-primary dark:bg-gray-900 shadow-lg transform transition-transform duration-300 z-50 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-600">
          <h2 className="font-bold text-lg">Menu</h2>
          <button onClick={toggleMenu}>
            <FaTimes size={20} />
          </button>
        </div>
        <div className="flex flex-col p-4 space-y-4">
          {[...directLinks, ...moreLinks].map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="dark:hover:text-yellow-300 flex items-center gap-2"
              onClick={toggleMenu}
            >
              {link.icon} {link.label}
            </Link>
          ))}
          
          {user && (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm dark:hover:text-yellow-300 w-full text-left"
            >
              <FaSignOutAlt className="text-yellow-400" /> Logout
            </button>
          )}

          {/* Theme Toggle inside sidebar */}
          <button
            onClick={() => {
              setDarkMode(!darkMode);
              setMenuOpen(false);
            }}
            className="flex items-center gap-2 p-2 rounded-md bg-white/10 hover:bg-white/20"
          >
            {darkMode ? (
              <FaSun className="text-yellow-400" />
            ) : (
              <FaMoon className="text-yellow-400" />
            )}{" "}
            Toggle Theme
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
