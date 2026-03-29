const mongoose = require('mongoose');

/**
 * Availability Schema
 * Defines the structure for storing user-specific scheduling windows.
 * Maps a User to their available hours for specific days of the week.
 */
const availabilitySchema = new mongoose.Schema({
  // Reference to the User model (Establishing a One-to-Many relationship)
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true 
  },
  
  // The specific day of the week (e.g., Monday, Tuesday)
  day: { 
    type: String, 
    required: true 
  }, 
  
  // Start of the availability window in 24-hour format (e.g., "09:00")
  startTime: { 
    type: String, 
    required: true 
  }, 
  
  // End of the availability window in 24-hour format (e.g., "17:00")
  endTime: { 
    type: String, 
    required: true 
  }
}, {
  // Automatically adds createdAt and updatedAt timestamps for better data tracking
  timestamps: true 
});

/**
 * Exporting the Availability model to be used in controllers
 * to manage scheduling logic.
 */
module.exports = mongoose.model('Availability', availabilitySchema);