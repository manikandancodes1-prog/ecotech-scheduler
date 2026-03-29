const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

/**
 * Initialize Express Application
 */
const app = express();

/**
 * Middleware Configuration
 * CORS: Enables Cross-Origin Resource Sharing for frontend-backend communication.
 * JSON: Built-in middleware to parse incoming requests with JSON payloads.
 */
app.use(cors());
app.use(express.json());

/**
 * API Route Definitions
 * Modularized routing for Authentication, Availability, and Booking management.
 */
app.use("/api/auth", require("./routes/auth"));
app.use("/api/availability", require("./routes/availability"));
app.use("/api/bookings", require("./routes/booking"));

/**
 * Database Connectivity
 * Establishes connection to MongoDB using URI from environment variables.
 * Includes success and error handling for robust server startup.
 */
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connection: Established Successfully"))
  .catch(err => {
    console.error("❌ MongoDB Connection Error:", err.message);
    process.exit(1); // Exit process with failure code if DB connection fails
  });

/**
 * Health Check Route
 * Simple endpoint to verify if the API service is operational.
 */
app.get("/", (req, res) => {
  res.status(200).json({ 
    status: "Online", 
    message: "EcoTech Scheduler API is operational and running." 
  });
});

/**
 * Server Configuration
 * Listens on a specified PORT from environment or defaults to 5000.
 */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server initialized and listening on Port: ${PORT}`);
});