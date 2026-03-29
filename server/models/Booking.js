const mongoose = require('mongoose');

/**
 * Booking Schema
 * Stores appointment details scheduled by external clients with registered users.
 * Facilitates the scheduling flow by linking clients to specific host IDs.
 */
const bookingSchema = new mongoose.Schema({
  // Reference to the Host User (The person with whom the meeting is scheduled)
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true 
  },

  // Name of the client/guest requesting the appointment
  bookedBy: { 
    type: String, 
    required: true 
  },

  // Email address of the client for sending confirmations/reminders
  email: { 
    type: String, 
    required: true 
  },

  // Date of the appointment (Format: YYYY-MM-DD)
  date: { 
    type: String, 
    required: true 
  },

  // Specific time slot for the meeting (Format: HH:mm)
  time: { 
    type: String, 
    required: true 
  }
}, {
  // Enables automatic tracking of when the booking was created or modified
  timestamps: true 
});

/**
 * Exporting the Booking model to handle appointment 
 * persistence and retrieval in controllers.
 */
module.exports = mongoose.model('Booking', bookingSchema);