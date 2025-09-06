import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { FaHome, FaUsers, FaChalkboardTeacher, FaUserShield } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

function Footer() {
  const { user } = useAuth();

  return (
    <footer className="bg-primary dark:bg-gray-900 text-white dark:text-white transition-colors duration-300 border-t border-gray-400 dark:border-gray-700">
     {/* max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 */}
      <div className="flex align-center justify-between p-4 gap-10 items-start border-b border-gray-300 dark:border-gray-700">
        
        {/* === Brand Section === */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold">🎓 Alumnexus</h2>
          <p className="mt-3 text-sm text-gray-200 dark:text-gray-400 max-w-sm">
            Bridging students, alumni, and administrators through mentorship,
            opportunities, and community growth.
          </p>
        </div>

        {/* === Quick Links (Role-Based) === */}
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <div className="flex flex-col space-y-2 text-sm">
            {!user ? (
              <>
                <Link
                  to="/"
                  className="flex items-center justify-center md:justify-start gap-2 dark:text-white dark:hover:text-yellow-300"
                >
                  <FaHome className="dark:text-yellow-400" /> Home
                </Link>
                <Link
                  to="/about"
                  className="flex items-center justify-center md:justify-start gap-2 dark:text-white dark:hover:text-yellow-300"
                >
                  <FaUsers className="dark:text-yellow-400" /> About
                </Link>
                <Link
                  to="/community"
                  className="flex items-center justify-center md:justify-start gap-2 dark:text-white dark:hover:text-yellow-300"
                >
                  <FaChalkboardTeacher className="dark:text-yellow-400" /> Community
                </Link>
              </>
            ) : user.role === "student" ? (
              <>
                <Link
                  to="/student/dashboard"
                  className="flex items-center justify-center md:justify-start gap-2 dark:text-white dark:hover:text-yellow-300"
                >
                  <FaHome className="dark:text-yellow-400" /> Dashboard
                </Link>
                <Link
                  to="/student/alumni-directory"
                  className="flex items-center justify-center md:justify-start gap-2 dark:text-white dark:hover:text-yellow-300"
                >
                  <FaUsers className="dark:text-yellow-400" /> Alumni Directory
                </Link>
                <Link
                  to="/student/mock-interviews"
                  className="flex items-center justify-center md:justify-start gap-2 dark:text-white dark:hover:text-yellow-300"
                >
                  <FaChalkboardTeacher className="dark:text-yellow-400" /> Mock Interviews
                </Link>
              </>
            ) : user.role === "alumni" ? (
              <>
                <Link
                  to="/alumni/dashboard"
                  className="flex items-center justify-center md:justify-start gap-2 dark:text-white dark:hover:text-yellow-300"
                >
                  <FaHome className="dark:text-yellow-400" /> Dashboard
                </Link>
                <Link
                  to="/alumni/post-referral"
                  className="flex items-center justify-center md:justify-start gap-2 dark:text-white dark:hover:text-yellow-300"
                >
                  <FaUsers className="dark:text-yellow-400" /> Post Referral
                </Link>
                <Link
                  to="/alumni/post-experience"
                  className="flex items-center justify-center md:justify-start gap-2 dark:text-white dark:hover:text-yellow-300"
                >
                  <FaChalkboardTeacher className="dark:text-yellow-400" /> Share Experience
                </Link>
              </>
            ) : user.role === "admin" ? (
              <>
                <Link
                  to="/admin/dashboard"
                  className="flex items-center justify-center md:justify-start gap-2 dark:text-white dark:hover:text-yellow-300"
                >
                  <FaUserShield className="dark:text-yellow-400" /> Admin Dashboard
                </Link>
                <Link
                  to="/admin/user-management"
                  className="flex items-center justify-center md:justify-start gap-2 dark:text-white dark:hover:text-yellow-300"
                >
                  <FaUsers className="dark:text-yellow-400" /> User Management
                </Link>
                <Link
                  to="/admin/analytics"
                  className="flex items-center justify-center md:justify-start gap-2 dark:text-white dark:hover:text-yellow-300"
                >
                  <FaChalkboardTeacher className="dark:text-yellow-400" /> Analytics
                </Link>
              </>
            ) : null}
          </div>
        </div>

        {/* === Social Media Section === */}
        <div className="text-center md:text-right">
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex justify-center md:justify-end space-x-6 text-2xl">
            <a
              href="#"
              className="dark:text-yellow-400 dark:hover:text-yellow-300 text-white"
              aria-label="Facebook"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="dark:text-yellow-400 dark:hover:text-yellow-300 text-white"
              aria-label="Twitter"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="dark:text-yellow-400 dark:hover:text-yellow-300 text-white"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      {/* === Bottom Bar === */}
      <div className="py-4 text-center text-sm text-gray-300 dark:text-gray-500 border-t border-gray-400 dark:border-gray-700">
        © {new Date().getFullYear()} <span className="font-semibold">Alumnexus</span>. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;
