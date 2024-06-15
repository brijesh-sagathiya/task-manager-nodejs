const mysql = require('mysql2/promise')
const dotenv = require('dotenv')

dotenv.config()

// Database connection configuration
const db = mysql.createPool({
    host: String(process.env.DB_HOST || 'localhost'),
    user: String(process.env.DB_USER || 'root'),
    password: String(process.env.DB_PASSWORD || 'developer'),
    database: String(process.env.DB_NAME || 'task_manager'),
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
})

// Attempt to connect to the database
db.getConnection()
    .then((connection) => {
        console.log('Database connected successfully')
        connection.release()
    })
    .catch((err) => {
        console.error('Database connection failed:', err.message)
    })

module.exports = db
