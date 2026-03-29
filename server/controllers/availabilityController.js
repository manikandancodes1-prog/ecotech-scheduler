const Availability = require("../models/Availability");

/**
 * Create or Update User Availability
 * Logic: Manages daily scheduling windows for a specific user. 
 * Using MongoDB's 'upsert' to either update existing hours or create a new entry.
 */
exports.setAvailability = async (req, res) => {
  try {
    const { day, startTime, endTime } = req.body;
    
    /**
     * findOneAndUpdate with { upsert: true }
     * This ensures atomicity: if the record exists for the day, update it; 
     * otherwise, create a new availability record.
     */
    const availability = await Availability.findOneAndUpdate(
      { userId: req.user.id, day }, // Filter by User ID and specific Day
      { startTime, endTime },       // Fields to update
      { upsert: true, new: true }    // Options: Create if missing, return the updated document
    );

    res.json({ 
      message: `${day} availability synchronized successfully`, 
      data: availability 
    });
  } catch (err) {
    // Error handling for database persistence issues
    res.status(500).json({ 
      error: "Internal Server Error: Unable to persist availability data", 
      details: err.message 
    });
  }
};

/**
 * Retrieve User Availability
 * Logic: Fetches the complete weekly availability profile for a specific user.
 * Publicly accessible via userId for the booking page.
 */
exports.getAvailability = async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Fetch all availability records associated with the target User ID
    const data = await Availability.find({ userId });
    
    if (!data || data.length === 0) {
      return res.status(404).json({ message: "No availability profiles found for this user." });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ 
      error: "Internal Server Error: Failed to retrieve availability profile", 
      details: err.message 
    });
  }
};