import { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  FaPodcast,
  FaUserCircle,
  FaCalendarAlt,
  FaPlay,
  FaPause,
  FaTimes,
} from "react-icons/fa";

function Podcasts() {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(null);
  const audioRef = useRef(null);

  // Fetch public podcasts
  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/podcasts/public"
        );
        setPodcasts(res.data);
      } catch (error) {
        console.error("Error fetching podcasts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPodcasts();
  }, []);

  // Handle play/pause toggle
  const handlePlayToggle = (index) => {
    if (activeIndex === index) {
      audioRef.current.pause();
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
      setTimeout(() => {
        if (audioRef.current) audioRef.current.play();
      }, 100);
    }
  };

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

      {/* Loading / Podcasts */}
      {loading ? (
        <p className="text-center text-gray-700 dark:text-gray-400">
          Loading podcasts...
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {podcasts.length > 0 ? (
            podcasts.map((podcast, index) => (
              <div
                key={podcast._id}
                className={`rounded-2xl shadow-lg border transition-all duration-300 flex flex-col justify-between p-6 ${
                  activeIndex === index
                    ? "bg-[#E6FFFA] dark:bg-[#222] border-[#0D9488] scale-[1.02]"
                    : "bg-white dark:bg-[#111827] border-gray-200 dark:border-gray-700 hover:shadow-xl hover:-translate-y-2"
                }`}
              >
                {/* Card Header */}
                <div className="flex items-center gap-3 mb-5 border-b border-gray-200 dark:border-gray-600 pb-3">
                  <FaUserCircle
                    size={40}
                    className="text-[#8B5CF6] dark:text-yellow-400"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {podcast.alumniName}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                      <FaCalendarAlt className="text-[#0D9488] dark:text-yellow-400" />
                      {new Date(podcast.createdAt).toLocaleDateString()}
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

                {/* === Button or Audio Player === */}
                {activeIndex === index ? (
                  <div className="flex items-center justify-center mt-4">
                    <div className="flex items-center gap-2 bg-white dark:bg-[#111827] rounded-md shadow px-3 py-[4px] border border-gray-200 dark:border-gray-700">
                      {/* Close button */}
                      <button
                        onClick={() => {
                          audioRef.current.pause();
                          setActiveIndex(null);
                        }}
                        className="p-2 rounded-md bg-red-500 hover:bg-red-600 text-white text-xs"
                      >
                        <FaTimes />
                      </button>

                      {/* Audio Element */}
                      <audio
                        ref={audioRef}
                        controls
                        autoPlay
                        className="h-6 w-40 rounded-md"
                        onEnded={() => setActiveIndex(null)}
                      >
                        <source
                          src={`http://localhost:8000${podcast.audioUrl}`}
                          type="audio/mp3"
                        />
                        Your browser does not support the audio element.
                      </audio>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => handlePlayToggle(index)}
                    className="mt-6 flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg font-medium text-white 
                      bg-[#0D9488] hover:bg-teal-700 
                      dark:bg-yellow-400 dark:text-black dark:hover:bg-yellow-300 
                      transition-colors"
                  >
                    <FaPlay /> Play Podcast
                  </button>
                )}
              </div>
            ))
          ) : (
            <p className="text-center col-span-full text-gray-700 dark:text-gray-400">
              No public podcasts available yet.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default Podcasts;
