const express = require("express");
const router = express.Router();
const { createBooking } = require("../controllers/bookingController");
const Booking = require("../models/Booking");

/**
 * Booking Routes
 * Base Path: /api/bookings
 */

/**
 * @route   POST /api/bookings
 * @desc    Process and create a new appointment booking
 * @access  Public (Used by clients to book slots)
 */
router.post("/", createBooking);

/**
 * @route   GET /api/bookings/:userId
 * @desc    Retrieve all appointments associated with a specific user
 * @access  Private/Public (Depending on Dashboard visibility)
 */
router.get("/:userId", async (req, res) => {
  try {
    const data = await Booking.find({ userId: req.params.userId });
    res.json(data);
  } catch (err) {
    res.status(500).json({ 
      error: "Internal Server Error: Unable to fetch user bookings", 
      details: err.message 
    });
  }
});

/**
 * @route   GET /api/bookings/check/:userId/:date
 * @desc    Check for already reserved time slots on a specific date
 * @access  Public
 * Logic: Returns an array of strings (times) to help the frontend disable booked slots.
 */
router.get("/check/:userId/:date", async (req, res) => {
  try {
    const { userId, date } = req.params;
    
    // Optimization: Selecting only the 'time' field to reduce payload size
    const bookedSlots = await Booking.find({ userId, date }).select("time");
    
    // Transform data into a clean array of time strings (e.g., ["09:00", "10:30"])
    const times = bookedSlots.map(b => b.time);
    res.json(times);
  } catch (err) {
    res.status(500).json({ 
      error: "Internal Server Error: Failed to retrieve reserved slots", 
      details: err.message 
    });
  }
});

/**
 * @route   DELETE /api/bookings/:id
 * @desc    Cancel/Remove a specific appointment by its ID
 * @access  Private/Public
 */
router.delete("/:id", async (req, res) => {
  try {
    const bookingId = req.params.id;
    const deletedBooking = await Booking.findByIdAndDelete(bookingId);

    if (!deletedBooking) {
      return res.status(404).json({ message: "Operation Failed: Booking not found" });
    }

    res.json({ message: "Appointment cancelled successfully" });
  } catch (err) {
    res.status(500).json({ 
      error: "Internal Server Error: Could not process cancellation", 
      details: err.message 
    });
  }
});

module.exports = router;