// Alumni/PostCompanyReview.jsx
import React, { useState } from "react";
import { FaStar, FaStarHalfAlt, FaPaperPlane } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import axios from "axios";
import { useTheme } from "../../context/ThemeProvider";

export default function PostCompanyReview() {
  const { darkMode } = useTheme();

  const [companyName, setCompanyName] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const maxWords = 200;

  // ✅ Safe word count (ignores trailing spaces)
  const wordCount =
    review.trim() === ""
      ? 0
      : review
          .trim()
          .split(/\s+/)
          .filter(Boolean).length;

  // ✅ Block typing after 200 words
  const handleReviewChange = (e) => {
    const text = e.target.value;
    const words =
      text.trim() === ""
        ? []
        : text.trim().split(/\s+/).filter(Boolean);

    if (words.length <= maxWords) {
      setReview(text);
    }
  };

  const handleSubmit = async () => {
    if (!companyName.trim()) {
      alert("Please enter the company name.");
      return;
    }
    if (rating === 0 || wordCount === 0 || wordCount > maxWords) {
      alert(`Please provide a valid rating and review (max ${maxWords} words).`);
      return;
    }

    try {
      await axios.post("/api/review", { companyName, rating, review });
      setSubmitted(true);
      confetti({ particleCount: 120, spread: 70, origin: { y: 0.7 } });

      // reset fields
      setCompanyName("");
      setReview("");
      setRating(0);
      setHoverRating(0);

      setTimeout(() => setSubmitted(false), 4000);
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Failed to submit review.");
    }
  };

  // THEME CLASSES
  const themeBg = darkMode ? "bg-gray-900" : "bg-[#F9FAFB]";
  const themeText = darkMode ? "text-white" : "text-[#1F2937]";
  const border = darkMode ? "border-gray-700" : "border-gray-300";
  const btnBg = darkMode
    ? "bg-yellow-400 hover:bg-yellow-300 text-gray-900"
    : "bg-[#0D9488] hover:bg-[#8B5CF6] text-white";
  const iconColor = darkMode ? "text-yellow-400" : "text-[#0D9488]";

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        stars.push(
          <FaStar
            key={i}
            className={`${iconColor} cursor-pointer text-3xl`}
            onClick={() => setRating(i)}
            onMouseEnter={() => setHoverRating(i)}
            onMouseLeave={() => setHoverRating(0)}
          />
        );
      } else if (rating + 0.5 === i) {
        stars.push(
          <FaStarHalfAlt
            key={i}
            className={`${iconColor} cursor-pointer text-3xl`}
            onClick={() => setRating(i - 0.5)}
            onMouseEnter={() => setHoverRating(i - 0.5)}
            onMouseLeave={() => setHoverRating(0)}
          />
        );
      } else {
        stars.push(
          <FaStar
            key={i}
            className="text-gray-400 cursor-pointer text-3xl"
            onClick={() => setRating(i)}
            onMouseEnter={() => setHoverRating(i)}
            onMouseLeave={() => setHoverRating(0)}
          />
        );
      }
    }
    return stars;
  };

  return (
    <div className={`${themeBg} ${themeText} min-h-screen w-full flex justify-center p-10`}>
      <motion.div
        className="w-full max-w-4xl p-8 rounded-3xl shadow-2xl border flex flex-col gap-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* ✅ Updated heading */}
        <h2 className="text-3xl font-bold mb-4">Share Your Review</h2>

        {/* Company Name */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-lg">
            Company Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Enter company name"
            className={`p-4 rounded-xl border ${border} outline-none text-lg ${themeBg} ${themeText}`}
          />
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2">
          {renderStars()}
          <span className="ml-2 font-semibold">{rating} / 5</span>
        </div>

        {/* Review */}
        <textarea
          rows="6"
          value={review}
          onChange={handleReviewChange}
          placeholder="Write your review (max 200 words)..."
          className={`w-full p-6 rounded-2xl border ${border} outline-none text-lg resize-none ${themeBg} ${themeText}`}
        />

        {/* Word Counter */}
        <div className="flex justify-end text-sm font-medium opacity-70">
          {wordCount}/{maxWords} words
        </div>

        {/* Submit Button */}
        <motion.button
          onClick={handleSubmit}
          disabled={!companyName || rating === 0 || wordCount === 0 || wordCount > maxWords}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`flex items-center justify-center gap-3 px-10 py-4 font-bold rounded-2xl shadow-xl transition
            ${
              !companyName || rating === 0 || wordCount === 0 || wordCount > maxWords
                ? "cursor-not-allowed bg-gray-400 text-white"
                : btnBg
            }`}
        >
          <FaPaperPlane /> Submit Review
        </motion.button>

        {/* Success Toast */}
        <AnimatePresence>
          {submitted && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.5 }}
              className="fixed bottom-10 left-1/2 transform -translate-x-1/2 px-6 py-4 bg-green-600 text-white rounded-2xl shadow-lg font-semibold"
            >
              🎉 Your review has been submitted successfully!
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
