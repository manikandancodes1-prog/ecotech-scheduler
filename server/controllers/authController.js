const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/**
 * Register New User
 * Logic: Checks for existing user, hashes the password for security, 
 * and persists the new user to the MongoDB database.
 */
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validation: Check if a user with the same email already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User registration failed: Email already exists" });
    }

    // Password Security: Salt and Hash the password before storing (Industry Standard)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create and save the new user record
    user = new User({ 
      name, 
      email, 
      password: hashedPassword 
    });
    await user.save();

    res.status(201).json({ message: "User account created successfully" });
  } catch (err) {
    // Catching and returning server-side exceptions
    res.status(500).json({ error: "Server error during registration", details: err.message });
  }
};

/**
 * Authenticate User (Login)
 * Logic: Verifies email, compares hashed passwords, and generates 
 * a JWT (JSON Web Token) for session management.
 */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Search for the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Authentication failed: Invalid credentials" });
    }

    // Security Check: Compare the plain-text password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Authentication failed: Invalid credentials" });
    }

    /**
     * Session Management: Generate a signed JWT
     * The token contains the User ID and expires in 1 hour for security purposes.
     */
    const token = jwt.sign(
      { id: user._id }, 
      process.env.JWT_SECRET, 
      { expiresIn: "1h" }
    );

    // Return the token and essential user profile data to the frontend
    res.json({ 
      token, 
      user: { 
        id: user._id, 
        name: user.name, 
        email: user.email 
      } 
    });
  } catch (err) {
    res.status(500).json({ error: "Server error during authentication", details: err.message });
  }
};