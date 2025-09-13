// Alumni/PostExperience.jsx
import React, { useState, useRef } from "react";
import {
  FaMicrophoneAlt,
  FaPaperPlane,
  FaStop,
  FaSmile,
  FaFont,
  FaPalette,
  FaSearchPlus,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { useTheme } from "../../context/ThemeProvider";
import axios from "axios"; // <-- Added Axios

export default function PostExperience() {
  const { darkMode } = useTheme();
  const [activeTab, setActiveTab] = useState("write");
  const [experience, setExperience] = useState("");
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300);
  const [audioDuration, setAudioDuration] = useState(0);
  const [showEmoji, setShowEmoji] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [gradient, setGradient] = useState(
    darkMode
      ? "from-yellow-400 via-yellow-500 to-yellow-600"
      : "from-teal-600 via-violet-500 to-teal-600"
  );
  const [font, setFont] = useState("font-sans");
  const [fontSize, setFontSize] = useState(22);

  const mediaRecorderRef = useRef(null);
  const audioChunks = useRef([]);
  const timerRef = useRef(null);
  const maxLength = 500;

  const gradients = darkMode
    ? [
        "from-yellow-400 via-yellow-500 to-yellow-600",
        "from-yellow-300 via-yellow-400 to-yellow-500",
      ]
    : [
        "from-teal-600 via-violet-500 to-teal-600",
        "from-teal-500 via-purple-500 to-teal-500",
      ];

  const fonts = [
    "font-sans",
    "font-serif",
    "font-mono",
    "italic font-serif",
    "tracking-widest font-bold",
  ];

  const iconColor = darkMode ? "text-yellow-400" : "text-teal-600";

  const wordCount =
    experience.trim() === "" ? 0 : experience.trim().split(/\s+/).length;

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunks.current = [];
      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunks.current.push(e.data);
      };
      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(audioChunks.current, { type: "audio/wav" });
        const url = URL.createObjectURL(blob);
        setAudioURL(url);
        const audio = new Audio(url);
        audio.onloadedmetadata = () =>
          setAudioDuration(Math.floor(audio.duration));
      };
      mediaRecorderRef.current.start();
      setRecording(true);
      setTimeLeft(300);
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            stopRecording();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch {
      alert("🎙️ Microphone access denied.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) mediaRecorderRef.current.stop();
    setRecording(false);
    clearInterval(timerRef.current);
    setTimeLeft(300);
  };

  const formatTime = (secs) => {
    const m = String(Math.floor(secs / 60)).padStart(2, "0");
    const s = String(secs % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleSubmit = async () => {
    if (experience.trim().length > 0 || audioDuration > 0) {
      try {
        const formData = new FormData();
        formData.append("experience", experience);
        if (audioURL) {
          const response = await fetch(audioURL);
          const blob = await response.blob();
          formData.append("audio", blob, "experience.wav");
        }

        // Axios POST request
        await axios.post("/api/experiences", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        setSubmitted(true);
        setExperience("");
        setAudioURL(null);
        setAudioDuration(0);
        setTimeout(() => setSubmitted(false), 4000);
      } catch (error) {
        console.error("Failed to share experience:", error);
        alert("❌ Failed to share experience. Please try again.");
      }
    }
  };

  const isDisabled = !(experience.trim().length > 0 || audioDuration > 0);

  const addEmoji = (emoji) => {
    setExperience((prev) => prev + emoji.native);
    setShowEmoji(false);
  };

  return (
    <div
      className={`min-h-screen w-full flex flex-col ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Heading */}
     <motion.h1
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  className={`text-3xl md:text-5xl font-extrabold flex items-center gap-3 mb-8 ${iconColor}`}
>
  <FaMicrophoneAlt /> Share Your Experience
</motion.h1>

      {/* Toolbar */}
      <div
        className={`sticky top-0 z-30 flex flex-wrap justify-between items-center gap-3 p-4 backdrop-blur-md ${
          darkMode ? "bg-gray-900/80" : "bg-gray-50/80"
        } border-b ${darkMode ? "border-gray-700" : "border-gray-200"}`}
      >
        <div className="flex gap-3 items-center">
          <div className="relative">
            <button
              onClick={() => setShowEmoji((prev) => !prev)}
              className={`p-3 rounded-full ${
                darkMode ? "bg-gray-700" : "bg-gray-200"
              } hover:scale-110 transition`}
            >
              <FaSmile
                className={darkMode ? "text-yellow-400" : "text-teal-600"}
              />
            </button>
            {showEmoji && (
              <div className="absolute z-50 mt-2">
                <Picker
                  data={data}
                  onEmojiSelect={addEmoji}
                  theme={darkMode ? "dark" : "light"}
                />
              </div>
            )}
          </div>
          <button
            onClick={() =>
              setFont((prev) => fonts[(fonts.indexOf(prev) + 1) % fonts.length])
            }
            className={`p-3 rounded-full ${
              darkMode ? "bg-gray-700" : "bg-gray-200"
            } hover:scale-110 transition`}
          >
            <FaFont className={darkMode ? "text-yellow-400" : "text-teal-600"} />
          </button>
          <button
            onClick={() =>
              setGradient(
                (prev) => gradients[(gradients.indexOf(prev) + 1) % gradients.length]
              )
            }
            className={`p-3 rounded-full ${
              darkMode ? "bg-gray-700" : "bg-gray-200"
            } hover:scale-110 transition`}
          >
            <FaPalette className={darkMode ? "text-yellow-400" : "text-teal-600"} />
          </button>
          <div className="flex items-center gap-2">
            <FaSearchPlus className={darkMode ? "text-yellow-400" : "text-teal-600"} />
            <input
              type="range"
              min="16"
              max="36"
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              className="w-28 accent-teal-600"
            />
          </div>
          <button
            onClick={() => setPreviewMode((prev) => !prev)}
            className={`px-5 py-2 rounded-full ${
              darkMode
                ? "bg-yellow-400 text-gray-900 hover:text-yellow-300"
                : "bg-teal-600 text-white hover:bg-teal-500"
            } font-bold transition`}
          >
            {previewMode ? "✏️ Edit" : "👀 Preview"}
          </button>
        </div>
        <div className="flex gap-3">
          {["write", "record"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 font-semibold text-lg ${
                activeTab === tab
                  ? darkMode
                    ? "text-yellow-400"
                    : "text-teal-600"
                  : "text-gray-500 dark:text-gray-400 hover:text-[#0D9488] dark:hover:text-yellow-300"
              }`}
            >
              {tab === "write" ? "✍️ Write" : "🎙️ Record"}
            </button>
          ))}
        </div>
      </div>

      {/* Content / Preview */}
      <div className="flex-1 w-full flex flex-col justify-center items-center p-6">
        {activeTab === "write" && !previewMode && (
          <textarea
            rows="12"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            placeholder="Write your story..."
            maxLength={maxLength}
            className={`w-full h-full p-6 rounded-3xl resize-none shadow-lg border text-xl focus:ring-4 outline-none ${
              darkMode
                ? "bg-gray-700 text-white border-gray-600 focus:ring-yellow-400/50"
                : "bg-white text-gray-900 border-gray-300 focus:ring-[#0D9488]/50"
            } ${font}`}
            style={{ fontSize: `${fontSize}px` }}
          />
        )}
        {activeTab === "write" && previewMode && (
          <div
            className={`w-full h-full flex items-center justify-center text-center px-4 rounded-3xl bg-gradient-to-br ${gradient} ${font} text-white`}
            style={{ fontSize: `${fontSize}px` }}
          >
            {experience || "✨ Your experience will appear here"}
          </div>
        )}

        {activeTab === "record" && (
          <div className="flex flex-col items-center gap-6 w-full h-full justify-center">
            {!recording ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={startRecording}
                className={`flex items-center gap-3 px-10 py-4 rounded-3xl text-white font-semibold shadow-xl text-lg ${
                  darkMode ? "bg-yellow-400 hover:text-gray-900" : "bg-[#0D9488] hover:bg-teal-700"
                }`}
              >
                <FaMicrophoneAlt /> Start Recording
              </motion.button>
            ) : (
              <div className="flex flex-col items-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={stopRecording}
                  className="flex items-center gap-3 px-10 py-4 rounded-3xl text-white font-semibold shadow-xl text-lg bg-red-600 hover:bg-red-700 transition"
                >
                  <FaStop /> Stop Recording
                </motion.button>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  ⏳ Time Left:{" "}
                  <span className={`${darkMode ? "text-yellow-400" : "text-teal-600"}`}>
                    {formatTime(timeLeft)}
                  </span>{" "}
                  (Must reach exactly 05:00)
                </p>
              </div>
            )}
            {audioURL && (
              <div className="flex flex-col items-center gap-3 w-full">
                <audio
                  controls
                  className="w-full rounded-3xl shadow-lg border border-gray-300 dark:border-gray-600"
                >
                  <source src={audioURL} type="audio/wav" />
                </audio>
                <p className={`text-sm font-semibold ${audioDuration === 300 ? "text-green-600" : "text-red-500"}`}>
                  Recorded Duration: {formatTime(audioDuration)} / 05:00
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Submit */}
      <div className="sticky bottom-0 flex justify-center items-center p-6 bg-opacity-80 backdrop-blur-md border-t gap-6">
        <motion.button
          onClick={handleSubmit}
          disabled={isDisabled}
          whileTap={{ scale: !isDisabled ? 0.95 : 1 }}
          className={`flex items-center gap-3 px-14 py-5 rounded-full font-bold shadow-xl text-lg transition ${
            isDisabled
              ? "bg-gray-400 text-white cursor-not-allowed"
              : darkMode
              ? "bg-yellow-400 text-gray-900 hover:text-yellow-300 hover:scale-105"
              : "bg-[#0D9488] text-white hover:bg-teal-700 hover:scale-105"
          }`}
        >
          <FaPaperPlane /> Share Experience
        </motion.button>
      </div>

      {/* Success Popup */}
      <AnimatePresence>
        {submitted && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.5 }}
            className="fixed bottom-24 left-1/2 transform -translate-x-1/2 px-8 py-4 bg-green-600 text-white rounded-3xl shadow-lg font-semibold max-w-max text-center"
          >
            🎉 Your experience has been shared successfully!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
