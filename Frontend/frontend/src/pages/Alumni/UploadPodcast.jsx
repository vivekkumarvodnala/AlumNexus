import { useState, useRef } from "react";
import axios from "axios";
import {
  FaMicrophone,
  FaStop,
  FaUpload,
  FaHeading,
  FaAlignLeft,
} from "react-icons/fa";
import { useAuth } from "../../context/AuthProvider";

function UploadPodcast() {
  const { token } = useAuth(); // Use token instead of user.token
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    isPublic: true,
  });
  const [audioFile, setAudioFile] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [message, setMessage] = useState("");

  const mediaRecorderRef = useRef(null);
  const audioChunks = useRef([]);

  // Handle form inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setAudioFile(file);
    setAudioUrl(URL.createObjectURL(file));
  };

  // Start recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);

      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunks.current.push(e.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(audioChunks.current, { type: "audio/webm" });
        audioChunks.current = [];
        setAudioUrl(URL.createObjectURL(blob));
        const file = new File([blob], "recording.webm", { type: "audio/webm" });
        setAudioFile(file);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Mic access denied:", err);
      setMessage("Please allow microphone access.");
    }
  };

  // Stop recording
  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setIsRecording(false);
  };

  // Submit podcast
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!audioFile) return setMessage("Please upload or record an audio file");

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("isPublic", formData.isPublic);
    data.append("audio", audioFile);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/podcasts/upload",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`, // send token here
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMessage("✅ Podcast uploaded successfully!");
      console.log(res.data);
    } catch (error) {
      setMessage(
        "❌ Upload failed: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-8 rounded-2xl shadow-xl max-w-2xl w-full border border-gray-200 dark:border-gray-800 transition-all">
      <h1 className="text-3xl font-bold mb-4 text-center flex items-center justify-center gap-3">
        <FaMicrophone className="text-teal-600 dark:text-yellow-400" /> Upload Podcast
      </h1>

      {/* Title */}
      <label className="mb-1 font-medium flex items-center gap-1">
        <FaHeading className="text-teal-600 dark:text-yellow-400 hover:text-yellow-300" /> Title
      </label>
      <input
        type="text"
        name="title"
        placeholder="Enter podcast title"
        onChange={handleChange}
        className="w-full p-3 mb-4 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none dark:bg-gray-800 dark:border-gray-700"
      />

      {/* Description */}
      <label className="mb-1 font-medium flex items-center gap-1">
        <FaAlignLeft className="text-teal-600 dark:text-yellow-400 hover:text-yellow-300" /> Description
      </label>
      <textarea
        name="description"
        placeholder="Write a short description..."
        onChange={handleChange}
        className="w-full p-3 mb-4 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none dark:bg-gray-800 dark:border-gray-700"
      />

      {/* File Upload */}
      <label className="mb-1 font-medium flex items-center gap-1">
        <FaUpload className="text-teal-600 dark:text-yellow-400 hover:text-yellow-300" /> Upload File
      </label>
      <input
        type="file"
        accept="audio/*"
        onChange={handleFileChange}
        className="mb-4 w-full"
      />

      {/* Recorder */}
      <button
        type="button"
        onClick={isRecording ? stopRecording : startRecording}
        className={`px-4 py-3 rounded-lg font-medium text-white flex items-center justify-center gap-2 w-full mb-4 shadow-md transition-all duration-200 ${
          isRecording
            ? "bg-red-600 hover:bg-red-700"
            : "bg-teal-600 hover:bg-teal-700 dark:bg-yellow-400 dark:hover:bg-yellow-300"
        }`}
      >
        {isRecording ? <FaStop /> : <FaMicrophone />}
        {isRecording ? "Stop Recording" : "Start Recording"}
      </button>

      {/* Preview */}
      {audioUrl && (
        <div className="mb-4">
          <p className="font-medium mb-1 flex items-center gap-1">
            <FaMicrophone className="text-teal-600 dark:text-yellow-400 hover:text-yellow-300" /> Preview
          </p>
          <audio controls src={audioUrl} className="w-full rounded-lg border dark:border-gray-700"></audio>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-teal-600 hover:bg-teal-700 dark:bg-yellow-400 dark:hover:bg-yellow-300 text-white py-3 rounded-lg font-semibold shadow-md transition-all duration-200 flex items-center justify-center gap-1"
      >
        <FaUpload className="text-white" /> Publish Podcast
      </button>

      {/* Status */}
      {message && <p className="mt-4 text-center text-sm font-medium">{message}</p>}
    </form>
  );
}

export default UploadPodcast;
