require('dotenv').config();

const express = require('express')
const cors = require('cors')
const { createServer } = require('http')
const cookieParser = require('cookie-parser')

const websocket = require('./utils/websocket')

// Import routes
const authRoutes = require('./routes/auth.routes')
const taskRoutes = require('./routes/task.routes')

// Load environment variables
const PORT = Number(process.env.PORT)

// Create Express app
const app = express()

app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Use routes
app.use('/api', authRoutes)
app.use('/api', taskRoutes)

// Create HTTP server
const server = createServer(app)

// Initialize WebSocket
websocket.init(server)

// Test endpoint
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the Task Manager application.' })
})

// Start server
server.listen(PORT, () => {
    console.log(`Server is running on port : ${PORT}.`)
})
