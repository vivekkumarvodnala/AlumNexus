// src/pages/Student/CompanyReviews.jsx
import React from "react";
import { Building2, Star } from "lucide-react";

export default function CompanyReviews() {
  // Dummy reviews
  const reviews = [
    {
      id: 1,
      company: "Google",
      reviewer: "Ravi Kumar (CSE '19)",
      rating: 5,
      review:
        "Google provides an amazing culture focused on innovation, learning, and growth. The work-life balance is great, and mentorship opportunities are excellent.",
    },
    {
      id: 2,
      company: "Microsoft",
      reviewer: "Anjali Sharma (ECE '18)",
      rating: 4,
      review:
        "Microsoft has a collaborative environment with plenty of resources. Sometimes project timelines can be tight, but overall a great place to grow your career.",
    },
  ];

  return (
    <div className="min-h-screen bg-bg dark:bg-accent px-6 py-8">
      <h1 className="text-2xl font-bold text-accent dark:text-gray-200 mb-6">
        Company Insider Reviews
      </h1>

      {/* Reviews Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="bg-white dark:bg-accent border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm p-5 hover:shadow-md transition"
          >
            {/* Company Info */}
            <div className="flex items-center gap-3 mb-3">
              <Building2 className="w-8 h-8 text-primary" />
              <div>
                <h2 className="font-semibold text-accent dark:text-gray-100">
                  {rev.company}
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {rev.reviewer}
                </p>
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1 mb-3">
              {[...Array(5)].map((_, idx) => (
                <Star
                  key={idx}
                  className={`w-4 h-4 ${
                    idx < rev.rating
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300 dark:text-gray-600"
                  }`}
                />
              ))}
            </div>

            {/* Review Text */}
            <p className="text-sm text-accent/80 dark:text-gray-300">
              {rev.review}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
