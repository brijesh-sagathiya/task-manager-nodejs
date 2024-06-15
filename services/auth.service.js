const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../config/db.config");
const jwtConfig = require("../config/jwt.config");

// Function to validate username and password
function validateCredentials({ username, password }) {
  if (
    !username ||
    !password ||
    typeof username !== "string" ||
    typeof password !== "string"
  ) {
    throw new Error("Please provide valid credentials");
  }
}

// Service class for authentication
class AuthService {
  // Register a new user
  async register(username, password) {
    // Validate provided credentials
    validateCredentials({ username, password });

    // Check if user already exists
    const [user] = await db.query("SELECT * FROM users WHERE username = ?", [
      username,
    ]);
    if (user.length) {
      throw new Error("User already exists");
    }

    // Hash the password and insert user into the database
    const hashedPassword = await bcrypt.hash(password, 8);
    await db.query("INSERT INTO users (username, password) VALUES (?, ?)", [
      username,
      hashedPassword,
    ]);

    return { message: "User registered successfully" };
  }

  // Login an existing user
  async login(username, password) {
    // Validate provided credentials
    validateCredentials({ username, password });

    // Check if user exists
    const [user] = await db.query("SELECT * FROM users WHERE username = ?", [
      username,
    ]);
    if (!user.length) {
      throw new Error("Invalid username or password");
    }

    // Compare passwords
    const validPassword = await bcrypt.compare(password, user[0].password);
    if (!validPassword) {
      throw new Error("Invalid username or password");
    }

    // Generate JWT token
    const token = jwt.sign({ id: user[0].id }, jwtConfig.secret, {
      expiresIn: "1h",
    });

    return { token, message: "login successfully!" };
  }
}

module.exports = new AuthService();
