const mongoose = require('mongoose');

/**
 * User Schema
 * Defines the core identity structure for registered users within the application.
 * Stores essential profile information and secure authentication credentials.
 */
const userSchema = new mongoose.Schema({
  // The user's full legal or display name
  name: { 
    type: String, 
    required: true,
    trim: true // Removes unnecessary whitespace
  },

  // Primary identifier for login; enforced with uniqueness at the database level
  email: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true // Normalizes email to prevent duplicate accounts with different casing
  },

  // Encrypted password string (handled by bcrypt before persistence)
  password: { 
    type: String, 
    required: true 
  }
}, {
  // Tracks account creation and last profile update timestamps
  timestamps: true 
});

/**
 * Exporting the User model to facilitate authentication 
 * and profile management across the system.
 */
module.exports = mongoose.model('User', userSchema);