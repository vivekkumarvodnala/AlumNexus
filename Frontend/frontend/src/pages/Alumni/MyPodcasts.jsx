import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthProvider";
import { FaPlay, FaPause, FaTimes } from "react-icons/fa";

export default function MyPodcasts() {
  const { user } = useAuth();
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeIndex, setActiveIndex] = useState(null);
  const audioRef = useRef(null);

  useEffect(() => {
    if (!user?.id) return;

    const fetchPodcasts = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/podcasts/alumni/${user.id}`
        );
        setPodcasts(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch podcasts");
      } finally {
        setLoading(false);
      }
    };

    fetchPodcasts();
  }, [user]);

  const handlePlayToggle = (index) => {
    if (activeIndex === index) {
      // Pause current audio
      audioRef.current.pause();
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
      setTimeout(() => {
        if (audioRef.current) audioRef.current.play();
      }, 100);
    }
  };

  if (loading)
    return (
      <p className="text-center text-lg text-gray-700 dark:text-gray-300">
        Loading podcasts...
      </p>
    );
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-[#F9FAFB] dark:bg-gray-900 p-6">
      <h1 className="text-3xl md:text-5xl font-extrabold text-center mb-12 text-[#0D9488] dark:text-yellow-400">
        🎙 My Podcasts
      </h1>

      {podcasts.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-300">
          No podcasts available yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {podcasts.map((podcast, index) => (
            <div
              key={podcast._id}
              className={`rounded-2xl shadow-lg border transition-all duration-300 flex flex-col justify-between p-6 ${
                activeIndex === index
                  ? "bg-[#E6FFFA] dark:bg-[#222] border-[#0D9488] scale-[1.02]"
                  : "bg-white dark:bg-[#111827] border-gray-200 dark:border-gray-700 hover:shadow-xl hover:-translate-y-2"
              }`}
            >
              <h2 className="text-lg md:text-xl font-bold mb-2 text-gray-900 dark:text-white line-clamp-2">
                {podcast.title}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                {podcast.description}
              </p>

              {/* Button or Audio Player */}
              <div className="flex justify-center mt-auto">
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
                          src={`http://localhost:5000${podcast.audioUrl}`}
                          type="audio/mp3"
                        />
                        Your browser does not support the audio element.
                      </audio>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => handlePlayToggle(index)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-white 
                      bg-[#0D9488] hover:bg-teal-700 
                      dark:bg-yellow-400 dark:text-black dark:hover:bg-yellow-300 
                      transition-colors"
                  >
                    <FaPlay /> Play Podcast
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
