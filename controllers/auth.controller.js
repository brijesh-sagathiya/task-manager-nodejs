const authService = require("../services/auth.service");
const cookieConfig = require("../config/cookie.config");

// Register a new user
exports.register = async (req, res) => {
  const { username, password } = req.body;

  try {
    const response = await authService.register(username, password);
    res.status(201).json(response);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

// Log in an existing user
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const response = await authService.login(username, password);

    // Set cookie with authentication token
    res
      .status(200)
      .cookie(cookieConfig.cookieName, response.token, {
        httpOnly: true,
      })
      .json({ message: response.message });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
