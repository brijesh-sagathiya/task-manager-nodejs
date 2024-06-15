const dotenv = require('dotenv')

dotenv.config()

// Configuration for JWT secret
module.exports = {
    secret: process.env.JWT_SECRET || 'default_secret',
}