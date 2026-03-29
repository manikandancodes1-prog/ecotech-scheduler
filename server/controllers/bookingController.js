const Booking = require("../models/Booking");

/**
 * Create a New Appointment
 * Logic: Validates slot availability to prevent double-booking, 
 * then persists the appointment details to the database.
 */
exports.createBooking = async (req, res) => {
  try {
    const { userId, bookedBy, email, date, time } = req.body;

    /**
     * Concurrency Control / Validation:
     * Checks if the specific User ID already has an appointment 
     * at the requested Date and Time.
     */
    const existing = await Booking.findOne({ userId, date, time });
    
    if (existing) {
      return res.status(400).json({ 
        message: "Conflict: This specific time slot has already been reserved." 
      });
    }

    // Initialize and save the new booking record
    const newBooking = new Booking({ 
      userId, 
      bookedBy, 
      email, 
      date, 
      time 
    });
    
    await newBooking.save();

    res.status(201).json({ 
      message: "Appointment confirmed and synchronized successfully!", 
      data: newBooking 
    });
  } catch (err) {
    // Handle database or server-side exceptions
    res.status(500).json({ 
      error: "Internal Server Error: Failed to process appointment booking", 
      details: err.message 
    });
  }
};