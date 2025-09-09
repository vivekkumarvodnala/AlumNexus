const Interview = require("../models/Interview");
const { v4: uuidv4 } = require("uuid");

// ✅ Get all interviews (students + alumni see them)
const getInterviews = async (req, res) => {
  try {
    const interviews = await Interview.find({})
      .populate("bookedBy", "name email");
    res.json(interviews);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ✅ Create interview slot (alumni/admin only)
const createInterview = async (req, res) => {
  try {
    if (req.user.role !== "alumni" && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" });
    }

    const { role, company, date, time, mode } = req.body;

    const interview = await Interview.create({
      alumni: req.user.name,
      role,
      company,
      date,
      time,
      mode,
    });

    res.status(201).json(interview);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ✅ Book an interview (student only)
const bookInterview = async (req, res) => {
  try {
    const interview = await Interview.findById(req.params.id);
    if (!interview) return res.status(404).json({ message: "Interview not found" });

    if (interview.status === "Filled") {
      return res.status(400).json({ message: "Slot already booked" });
    }

    const meetingLink = `https://meet.jit.si/${uuidv4()}`;

    interview.status = "Filled";
    interview.bookedBy = req.user._id;
    interview.meetingLink = meetingLink;
    await interview.save();

    res.json({
      message: "Interview booked successfully",
      bookedBy: req.user.name,
      userId: req.user._id,
      meetingLink,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ✅ Get slots created by logged-in alumni
const getMyCreatedSlots = async (req, res) => {
  try {
    if (req.user.role !== "alumni" && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" });
    }

    const interviews = await Interview.find({ alumni: req.user.name })
      .populate("bookedBy", "name email");
    res.json(interviews);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ✅ Get bookings made by logged-in student
const getMyBookings = async (req, res) => {
  try {
    const interviews = await Interview.find({ bookedBy: req.user._id });
    res.json(interviews);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ✅ Update interview slot (alumni only)
const updateInterview = async (req, res) => {
  try {
    const interview = await Interview.findById(req.params.id);
    if (!interview) return res.status(404).json({ message: "Interview not found" });

    if (req.user.role !== "alumni" && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" });
    }

    const { role, company, date, time, mode } = req.body;
    interview.role = role || interview.role;
    interview.company = company || interview.company;
    interview.date = date || interview.date;
    interview.time = time || interview.time;
    interview.mode = mode || interview.mode;

    await interview.save();
    res.json(interview);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ✅ Delete interview slot (alumni only)
const deleteInterview = async (req, res) => {
  try {
    const interview = await Interview.findById(req.params.id);
    if (!interview) return res.status(404).json({ message: "Interview not found" });

    if (req.user.role !== "alumni" && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" });
    }

    await interview.deleteOne();
    res.json({ message: "Interview deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = {
  getInterviews,
  createInterview,
  bookInterview,
  getMyCreatedSlots,
  getMyBookings,
  updateInterview,
  deleteInterview,
};
