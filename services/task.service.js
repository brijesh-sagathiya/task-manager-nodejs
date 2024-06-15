const db = require('../config/db.config')

// Service class for handling tasks
class TaskService {
    // Get all tasks for a specific user
    async getAllTasks({ userId }) {
        const [tasks] = await db.query(
            'SELECT * FROM tasks WHERE user_id = ?',
            [userId]
        )
        return tasks
    }

    // Get a task by ID for a specific user
    async getTaskById({ taskId, userId }) {
        const [task] = await db.query(
            'SELECT * FROM tasks WHERE id = ? AND user_id = ?',
            [taskId, userId]
        )
        if (!task.length) {
            throw new Error('Task not found')
        }
        return task[0]
    }

    // Create a new task for a specific user
    async createTask({ title, description, userId }) {
        // Insert new task into the database
        try {
            const [result] = await db.query(
                'INSERT INTO tasks (title, description, user_id) VALUES (?, ?, ?)',
                [title, description, userId]
            )

            // Return the created task object
            return {
                id: result.insertId,
                title,
                description,
                status: 'pending',
                user_id: userId,
            }
        } catch (error) {
            // Handle validation error
            console.error('Validation error:', error.message)
            return error
        }
    }

    // Update a task for a specific user
    async updateTask({ taskId, title, description, status, userId }) {
        // Update task in the database
        const [result] = await db.query(
            'UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ? AND user_id = ?',
            [title, description, status, taskId, userId]
        )
        if (result.affectedRows === 0) {
            throw new Error('Task not found or not authorized')
        }
        return { id: taskId, title, description, status }
    }

    // Delete a task for a specific user
    async deleteTask({ taskId, userId }) {
        // Delete task from the database
        const [result] = await db.query(
            'DELETE FROM tasks WHERE id = ? AND user_id = ?',
            [taskId, userId]
        )
        if (result.affectedRows === 0) {
            throw new Error('Task not found or not authorized')
        }
        return { message: 'Task deleted successfully' }
    }
}

module.exports = new TaskService()
