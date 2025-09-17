const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const http = require("http");
const connectDB = require("./config/db");
const resourceRoutes = require("./routes/resourceRoutes");

const messageRoutes = require("./routes/messages");
const initSocket = require("./socket");
// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
// app.use(cors());
app.use(cors());

app.use(express.json());

// Serve uploaded files statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/interviews", require("./routes/interviewRoutes"));    

// Podcast routes

app.use("/api/resources", resourceRoutes);
app.use("/api/podcasts", require("./routes/podcastRoutes"));
app.use("/api/referrals", require("./routes/referralRoutes"));
app.use("/api/messages", messageRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("Hello from the Server.js");
});

// SOCKET.IO
const server = http.createServer(app);
initSocket(server);

// Start server
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
