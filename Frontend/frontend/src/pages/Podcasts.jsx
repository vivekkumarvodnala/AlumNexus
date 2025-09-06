import { useState } from "react";
import {
  FaPodcast,
  FaUserCircle,
  FaCalendarAlt,
  FaPlay,
} from "react-icons/fa";

function Podcasts() {
  const [podcasts] = useState([
    {
      id: 1,
      title: "Cracking FAANG Interviews",
      description:
        "Alumni shares strategies for preparing for FAANG interviews, covering DSA, system design, and behavioral rounds.",
      alumni: "Anonymous Alumni",
      date: "2025-08-28",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      isPublic: true,
    },
    {
      id: 2,
      title: "Career Growth in Data Science",
      description:
        "Insights into the journey from a fresher to a Data Scientist role at a top MNC.",
      alumni: "Anonymous Alumni",
      date: "2025-08-15",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
      isPublic: true,
    },
    {
      id: 3,
      title: "Personal Story (Private)",
      description: "This podcast is private and should not be shown.",
      alumni: "Private User",
      date: "2025-07-30",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
      isPublic: false,
    },
    {
      id: 1,
      title: "Cracking MAANG Interviews",
      description:
        "Alumni shares strategies for preparing for MAANG interviews, covering DSA, system design, and behavioral rounds.",
      alumni: "Anonymous Alumni",
      date: "2025-08-28",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      isPublic: true,
    },
  ]);

  const publicPodcasts = podcasts.filter((pod) => pod.isPublic);

  return (
    <div className="min-h-screen bg-[#F9FAFB] dark:bg-gray-900 px-6 md:px-16 py-12 transition-colors duration-300">
      {/* Header */}
      <div className="text-center mb-14">
        <h1 className="text-3xl md:text-5xl font-extrabold flex items-center justify-center gap-3 text-[#0D9488] dark:text-yellow-400">
          <FaPodcast className="text-4xl md:text-5xl" /> Alumni Podcasts
        </h1>
        <p className="mt-4 text-lg max-w-2xl mx-auto text-gray-700 dark:text-gray-300">
          Listen to real experiences, insights, and career guidance directly
          from our alumni.
        </p>
      </div>

      {/* Podcasts Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {publicPodcasts.length > 0 ? (
          publicPodcasts.map((podcast) => (
            <div
              key={podcast.id}
              className="bg-white dark:bg-[#111827] rounded-2xl shadow-lg 
              border border-gray-200 dark:border-gray-700 hover:shadow-xl 
              hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between p-6"
            >
              <div>
                {/* Header */}
                <div className="flex items-center gap-3 mb-5 border-b border-gray-200 dark:border-gray-600 pb-3">
                  <FaUserCircle
                    size={40}
                    className="text-[#8B5CF6] dark:text-yellow-400"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {podcast.alumni}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                      <FaCalendarAlt className="text-[#0D9488] dark:text-yellow-400" />
                      {podcast.date}
                    </p>
                  </div>
                </div>

                {/* Title & Description */}
                <h2 className="text-lg font-bold mb-2 text-gray-900 dark:text-white line-clamp-2">
                  {podcast.title}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                  {podcast.description}
                </p>

                {/* Audio Player */}
                <audio controls className="w-full rounded-lg overflow-hidden">
                  <source src={podcast.audioUrl} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </div>

              {/* Play Button */}
              <button className="mt-6 flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg font-medium text-white 
                bg-[#0D9488] hover:bg-teal-700 
                dark:bg-yellow-400 dark:text-black dark:hover:bg-yellow-300 
                transition-colors">
                <FaPlay /> Play Podcast
              </button>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-700 dark:text-gray-400">
            No public podcasts available yet.
          </p>
        )}
      </div>
    </div>
  );
}

export default Podcasts;
