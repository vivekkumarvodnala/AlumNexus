const Interview = require("../models/Interview");

// Get all interviews
const getInterviews = async (req, res) => {
  const interviews = await Interview.find({});
  res.json(interviews);
};

// Book an interview
const bookInterview = async (req, res) => {
  const interview = await Interview.findById(req.params.id);
  if (!interview) return res.status(404).json({ message: "Interview not found" });

  if (interview.status === "Filled")
    return res.status(400).json({ message: "Slot already booked" });

  interview.status = "Filled";
  interview.bookedBy = req.user._id; // links to your User
  await interview.save();

  res.json({
    message: "Interview booked successfully",
    bookedBy: req.user.name,
    userId: req.user._id,
  });
};

module.exports = { getInterviews, bookInterview };
