// Alumni/ManageProfile.jsx
import React, { useState, useEffect } from "react";
import { FaUserEdit } from "react-icons/fa";
import axios from "axios";
import { useTheme } from "../../context/ThemeProvider";

export default function ManageProfile() {
  const { darkMode } = useTheme();
  const [profile, setProfile] = useState({
    name: "",
    batch: "",
    company: "",
    role: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get("/api/alumni/profile"); // Replace with your endpoint
        setProfile(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await axios.put("/api/alumni/profile", profile); // Replace with your endpoint
      alert("Profile saved successfully!");
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Failed to save profile.");
    } finally {
      setSaving(false);
    }
  };

  const theme = {
    light: {
      bg: "bg-white",
      text: "text-[#1F2937]",
      border: "border-gray-300",
      focusRing: "focus:ring-[#0D9488]",
      icon: "text-[#0D9488]",
      buttonBg: "bg-[#0D9488]",
      buttonHover: "hover:bg-[#059669]",
      buttonText: "text-white",
    },
    dark: {
      bg: "bg-gray-900",
      text: "text-white",
      border: "border-gray-700",
      focusRing: "focus:ring-yellow-400",
      icon: "text-yellow-400",
      buttonBg: "bg-yellow-400",
      buttonHover: "hover:bg-yellow-300",
      buttonText: "text-gray-900",
    },
  };

  const t = darkMode ? theme.dark : theme.light;

  if (loading) {
    return (
      <div className={`flex justify-center items-center min-h-screen ${t.text}`}>
        Loading profile...
      </div>
    );
  }

  return (
    <div
      className={`${t.bg} ${t.text} p-6 rounded-2xl shadow-md border ${t.border} transition-colors duration-300`}
    >
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <FaUserEdit className={`${t.icon}`} />
        Manage Profile
      </h2>

      <form className="grid gap-4">
        {["name", "batch", "company", "role"].map((field) => (
          <input
            key={field}
            name={field}
            placeholder={`Enter ${field}`}
            value={profile[field]}
            onChange={handleChange}
            className={`p-3 rounded-lg border ${t.border} outline-none ${t.bg} ${t.text} focus:ring-2 ${t.focusRing} transition`}
          />
        ))}

        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className={`px-4 py-2 rounded-lg transition font-semibold ${t.buttonBg} ${t.buttonText} ${t.buttonHover} ${
            saving ? "opacity-60 cursor-not-allowed" : ""
          }`}
        >
          {saving ? "Saving..." : "Save Profile"}
        </button>
      </form>
    </div>
  );
}
