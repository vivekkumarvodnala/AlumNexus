import { useState } from "react";
import axios from "axios";
import { useTheme } from "../context/ThemeProvider";

export default function CreateInterview() {
  const [form, setForm] = useState({
    alumni: "",
    role: "",
    company: "",
    date: "",
    time: "",
    mode: "Online",
  });
  const { darkMode } = useTheme();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      console.log(token);
      await axios.post("http://localhost:5000/api/interviews/", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Interview slot created!");
      setForm({ alumni: "", role: "", company: "", date: "", time: "", mode: "Online" });
    } catch (err) {
      alert(err.response?.data?.message || "Error creating slot");
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-6 ${
        darkMode ? "bg-gray-900 text-white" : "bg-background text-accent"
      }`}
    >
      <form
        onSubmit={handleSubmit}
        className={`shadow-lg rounded-3xl p-8 w-full max-w-lg transition ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <h1 className="text-2xl font-heading font-bold mb-6 text-center text-secondary">
          ✨ Create Interview Slot
        </h1>

        <input
          type="text"
          name="role"
          value={form.role}
          onChange={handleChange}
          placeholder="Role (e.g., SDE)"
          className="w-full mb-4 px-4 py-2 border rounded-lg"
          required
        />

        <input
          type="text"
          name="company"
          value={form.company}
          onChange={handleChange}
          placeholder="Company"
          className="w-full mb-4 px-4 py-2 border rounded-lg"
          required
        />

        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 border rounded-lg"
          required
        />

        <input
          type="time"
          name="time"
          value={form.time}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 border rounded-lg"
          required
        />

        <select
          name="mode"
          value={form.mode}
          onChange={handleChange}
          className="w-full mb-6 px-4 py-2 border rounded-lg"
        >
          <option value="Online">Online</option>
          <option value="Offline">Offline</option>
        </select>

        <button
          type="submit"
          className="w-full py-2 bg-primary hover:bg-teal-500 text-white font-bold rounded-lg"
        >
          Create Slot
        </button>
      </form>
    </div>
  );
}
