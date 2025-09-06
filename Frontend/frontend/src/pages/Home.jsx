// src/pages/Home.jsx
import { FaPodcast, FaUsers, FaGraduationCap } from "react-icons/fa";
import ProfileCard from "../components/ProfileCard";

function Home() {
  return (
    <div className="min-h-screen bg-[#F9FAFB] dark:bg-gray-900 px-6 md:px-16 py-12 transition-colors duration-300">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-extrabold text-[#0D9488] dark:text-yellow-400">
          Welcome to Alumni Connect
        </h1>
        <p className="mt-4 text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
          Bridging the gap between students and alumni with mentorship,
          podcasts, and shared experiences.
        </p>
      </div>

      {/* Features Section */}
      <div className="grid md:grid-cols-3 gap-10 mb-16">
        <div className="bg-white dark:bg-[#111827] p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition">
          <FaPodcast className="text-5xl text-[#8B5CF6] dark:text-yellow-400 mb-4" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            Alumni Podcasts
          </h3>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Listen to inspiring stories and career journeys shared by our alumni.
          </p>
        </div>

        <div className="bg-white dark:bg-[#111827] p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition">
          <FaUsers className="text-5xl text-[#0D9488] dark:text-yellow-400 mb-4" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            Networking
          </h3>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Connect with peers, seniors, and alumni to grow your network.
          </p>
        </div>

        <div className="bg-white dark:bg-[#111827] p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition">
          <FaGraduationCap className="text-5xl text-[#8B5CF6] dark:text-yellow-400 mb-4" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            Mentorship
          </h3>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Gain career guidance from alumni working in top companies worldwide.
          </p>
        </div>
      </div>

      {/* Featured Alumni Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8 text-[#0D9488] dark:text-yellow-400">
          Featured Alumni
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <ProfileCard
            name="Rahul Sharma"
            role="Software Engineer @ Google"
            description="Rahul specializes in backend development and system design. Passionate about mentoring students."
          />
          <ProfileCard
            name="Ananya Singh"
            role="Data Scientist @ Microsoft"
            description="Ananya works in AI/ML and has extensive experience in data-driven problem solving."
          />
          <ProfileCard
            name="Vikram Patel"
            role="Product Manager @ Amazon"
            description="Vikram focuses on product strategy and innovation. Loves sharing knowledge about leadership."
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
