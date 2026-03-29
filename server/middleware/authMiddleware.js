const jwt = require("jsonwebtoken");

/**
 * Authentication Middleware
 * This function intercepts protected routes to verify the presence 
 * and validity of a JSON Web Token (JWT).
 */
module.exports = (req, res, next) => {
  // Retrieve the token from the custom 'x-auth-token' header
  const token = req.header("x-auth-token"); 

  // Check if token is missing
  if (!token) {
    return res.status(401).json({ 
      message: "Authorization Denied: No security token provided." 
    });
  }

  try {
    /**
     * Verify the token using the secret key.
     * If valid, it returns the decoded payload (usually contains User ID).
     */
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach the decoded user data to the request object for use in subsequent controllers
    req.user = decoded; 
    
    // Proceed to the next middleware or controller function
    next();
  } catch (err) {
    // If the token is expired or tampered with
    res.status(401).json({ 
      message: "Authorization Failed: Provided token is invalid or expired." 
    });
  }
};