const express = require('express')

const taskController = require('../controllers/task.controller')
const authMiddleware = require('../middlewares/auth.middleware')

const {
    validateTaskData,
    validate,
    validateUpdateTaskData,
    validateUpdateTask,
} = require('../middlewares/validator')

const router = express.Router()

// Apply authentication middleware to all routes below
router.use(authMiddleware)

// Route to get all tasks
router.get('/tasks', taskController.getAllTasks)

// Route to get a single task by ID
router.get('/tasks/:id', taskController.getTaskById)

// Route to create a new task
router.post('/tasks', validateTaskData, validate, taskController.createTask)

// Route to update a task by ID
router.put(
    '/tasks/:id',
    validateUpdateTaskData,
    validateUpdateTask,
    taskController.updateTask
)

// Route to delete a task by ID
router.delete('/tasks/:id', taskController.deleteTask)

module.exports = router
