const express = require("express");
const router = express.Router();
const { setAvailability, getAvailability } = require("../controllers/availabilityController");
const auth = require("../middleware/authMiddleware");

/**
 * Availability Routes
 * Base Path: /api/availability
 */

/**
 * @route   POST /api/availability
 * @desc    Create or update user's availability schedule
 * @access  Private (Requires JWT Authentication)
 * Logic: Only the logged-in user can modify their own schedule.
 */
router.post("/", auth, setAvailability); 

/**
 * @route   GET /api/availability/:userId
 * @desc    Fetch the availability profile for a specific user
 * @access  Public
 * Logic: Accessible by anyone to view available slots before booking.
 */
router.get("/:userId", getAvailability);

module.exports = router;