const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const resourceRoutes = require("./routes/resourceRoutes");
// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
// app.use(cors());
app.use(cors({
  origin: "*",
  methods: ["GET","POST","PUT","DELETE","OPTIONS"]
}));
;

app.use(express.json());

// Serve uploaded files statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/interviews", require("./routes/interviewRoutes"));    

// Podcast routes
app.use("/api/podcasts", require("./routes/podcastRoutes"));
app.use("/api/referrals", require("./routes/referralRoutes"));

app.use("/api/resources", resourceRoutes);
app.use("/uploads/resources", express.static("uploads/resources"));

// Test Route
app.get("/", (req, res) => {
  res.send("Hello from the Server.js");
});

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
