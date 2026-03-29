const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");

/**
 * Authentication Routes
 * Base Path: /api/auth (Defined in the main server/app file)
 */

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user and store credentials securely
 * @access  Public
 */
router.post("/register", register); 

/**
 * @route   POST /api/auth/login
 * @desc    Authenticate user and return a JWT for session management
 * @access  Public
 */
router.post("/login", login);

module.exports = router;