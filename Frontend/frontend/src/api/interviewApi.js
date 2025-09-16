// src/api/interviewApi.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api", // backend base URL
});

// Add token to headers automatically if present
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// 📍 Fetch all interviews (for students)
export const getAllInterviews = () => API.get("/interviews");

// 📍 Create interview slot (alumni only)
export const createInterview = (data) => API.post("/interviews", data);

// 📍 Book interview slot (student only)
export const bookInterview = (id) => API.post(`/interviews/${id}/book`);

// 📍 Get interviews created by alumni
export const getMyCreatedSlots = () => API.get("/interviews/mine");

// 📍 Get interviews booked by student
export const getMyBookings = () => API.get("/interviews/bookings");

// 📍 Update a slot (alumni only)
export const updateInterview = (id, data) =>
  API.put(`/interviews/${id}`, data);

// 📍 Delete a slot (alumni only)
export const deleteInterview = (id) => API.delete(`/interviews/${id}`);

