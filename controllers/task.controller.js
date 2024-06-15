const taskService = require('../services/task.service');
const websocket = require('../utils/websocket');

// Get all tasks for the logged-in user
exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await taskService.getAllTasks({ userId: req.userId });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get a task by ID for the logged-in user
exports.getTaskById = async (req, res) => {
    try {
        const task = await taskService.getTaskById({
            taskId: req.params.id,
            userId: req.userId,
        });
        res.status(200).json(task);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Create a new task for the logged-in user
exports.createTask = async (req, res) => {
    const { title, description } = req.body;
    try {
        const task = await taskService.createTask({
            title,
            description,
            userId: req.userId,
        });
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update a task for the logged-in user
exports.updateTask = async (req, res) => {
    const { title, description, status } = req.body;
    try {
        const task = await taskService.updateTask({
            title,
            description,
            status,
            taskId: req.params.id,
            userId: req.userId,
        });

        // Emit a websocket event for task status update
        const io = websocket.getIO();
        io.emit('taskStatusUpdate', task);

        res.status(200).json(task);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a task for the logged-in user
exports.deleteTask = async (req, res) => {
    try {
        const response = await taskService.deleteTask({
            taskId: req.params.id,
            userId: req.userId,
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
