const dotenv = require("dotenv");
dotenv.config();

// Configuration for the authentication token cookie
module.exports = {
  cookieName: process.env.COOKIE_NAME || "access_token",
};
