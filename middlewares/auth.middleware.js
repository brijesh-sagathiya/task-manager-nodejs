const jwt = require("jsonwebtoken");
const jwtConfig = require("../config/jwt.config");
const cookieConfig = require("../config/cookie.config");

// Middleware function to authenticate JWT token
function authenticateToken(req, res, next) {
  // Extract token from cookie
  const token = req.cookies.access_token;
  if (!token) {
    // If token is not present, return 401 Unauthorized
    return res.status(401).json({ message: "Access Denied" });
  }

  try {
    // Verify the token
    const verified = jwt.verify(token, jwtConfig.secret);
    // Add user ID to request object for further use
    req.userId = verified.id;
    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error(error);
    // Handle different types of JWT errors
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: "Invalid Token" });
    }
    // Handle other errors
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = authenticateToken;
