const Interview = require("../models/Interview");
const { v4: uuidv4 } = require("uuid");
// Get all interviews
const getInterviews = async (req, res) => {
  try {
    const interviews = await Interview.find({});
    res.json(interviews);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Create interview slot (only alumni/admin)
const createInterview = async (req, res) => {
  try {
    console.log("REQ USER:", req.user); // check user
    console.log("REQ BODY:", req.body); // check form data

    if (req.user.role !== "alumni" && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" });
    }

    const { role, company, date, time, mode } = req.body;

    const interview = await Interview.create({
      alumni: req.user.name, // backend uses this, frontend sends alumni too (ignore)
      role,
      company,
      date,
      time,
      mode,
    });

    res.status(201).json(interview);
  } catch (err) {
    console.error("CREATE INTERVIEW ERROR:", err); // log full error
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


// Book an interview
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
        meetingLink,
      userId: req.user._id,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { getInterviews, createInterview, bookInterview };
