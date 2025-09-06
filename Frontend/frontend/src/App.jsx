import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FilterSidebar from "./components/FilterSidebar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Community from "./pages/Community";
import Podcasts from "./pages/Podcasts";
import MockInterviews from "./pages/MockInterviews";

// Auth Pages
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";

// Admin Pages
import AnalyticsDashboard from "./pages/Admin/AnalyticsDashboard";
import ContentModeration from "./pages/Admin/ContentModeration";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import RoleConversion from "./pages/Admin/RoleConversion";
import UserManagement from "./pages/Admin/UserManagement";

// Student Pages
import StudentDashboard from "./pages/Student/StudentDashboard";
import AlumniDirectory from "./pages/Student/AlumniDirectory";
import JobReferrals from "./pages/Student/JobReferrals";
import InterviewExperiences from "./pages/Student/InterviewExperiences";
import MockInterviewScheduler from "./pages/Student/MockInterviewScheduler";
import CompanyReviews from "./pages/Student/CompanyReviews";
import ChatAlumni from "./pages/Student/ChatAlumni";
import SuccessStories from "./pages/Student/SuccessStories";
import ResourceBank from "./pages/Student/ResourceBank";
import StudentAlumniProfile from "./pages/Student/StudentAlumniProfile";

// Alumni Pages
import PostReview from "./pages/Alumni/PostReview";
import UploadPodcast from "./pages/Alumni/UploadPodcast";
import AlumniDashboard from "./pages/Alumni/AlumniDashboard";
import AlumniProfile from "./pages/Alumni/AlumniProfile";
import ManageProfile from "./pages/Alumni/ManageProfile";
import PostExperience from "./pages/Alumni/PostExperience";
import PostReferral from "./pages/Alumni/PostReferral";
import PostResource from "./pages/Alumni/PostResource";
import PostStory from "./pages/Alumni/PostStory";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-background dark:bg-gray-900 text-accent dark:text-white">
        {/* Navbar */}
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

        <div className="flex flex-1">
          {/* Sidebar */}
          <FilterSidebar />

          {/* Main Content */}
          <main className="flex flex-1 items-center justify-center p-6">
            <Routes>
              {/* Public Pages */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/community" element={<Community />} />
              <Route path="/podcasts" element={<Podcasts />} />
              <Route path="/mock-interviews" element={<MockInterviews />} />

              {/* Auth Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Admin Routes */}
              <Route path="/admin/analytics-dashboard" element={<AnalyticsDashboard />} />
              <Route path="/admin/content-moderation" element={<ContentModeration />} />
              <Route path="/admin/admin-dashboard" element={<AdminDashboard />} />
              <Route path="/admin/role-conversion" element={<RoleConversion />} />
              <Route path="/admin/user-management" element={<UserManagement />} />

              {/* Student Routes */}
              <Route path="/student/dashboard" element={<StudentDashboard />} />
              <Route path="/student/alumni-directory" element={<AlumniDirectory />} />
              <Route path="/student/job-referrals" element={<JobReferrals />} />
              <Route path="/student/alumni/:id" element={<StudentAlumniProfile />} />
              <Route path="/student/interview-experiences" element={<InterviewExperiences />} />
              <Route path="/student/mock-interviews" element={<MockInterviewScheduler />} />
              <Route path="/student/company-reviews" element={<CompanyReviews />} /> 
              <Route path="/student/chat-alumni" element={<ChatAlumni />} />
              <Route path="/student/success-stories" element={<SuccessStories />} />
              <Route path="/student/resource-bank" element={<ResourceBank />} />

              {/* Alumni Routes */}
              <Route path="/alumni/post-review" element={<PostReview />} />
              <Route path="/alumni/upload-podcast" element={<UploadPodcast />} />
              <Route path="/alumni/alumni-dashboard" element={<AlumniDashboard />} />
              <Route path="/alumni/alumni-profile-page" element={<AlumniProfile />}/>
              <Route path="/alumni/manage-profile" element={<ManageProfile />} />
              <Route path="/alumni/post-experience" element={<PostExperience />} />
              <Route path="/alumni/post-referral" element={<PostReferral />} />
              <Route path="/alumni/post-resource" element={<PostResource />} />
              <Route path="/alumni/post-story" element={<PostStory />} />
            </Routes>
          </main>
        </div>

        {/* Footer */}
        <Footer />
      </div>

      {/* Toast container (keep inside Router) */}
      <ToastContainer position="top-right" autoClose={3000} />
    </Router>
  );
}

export default App;
