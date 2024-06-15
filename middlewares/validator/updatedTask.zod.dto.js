const { body, validationResult } = require('express-validator');

// Validation rules for updating task data
const validateUpdateTaskData = [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('status').isIn(['pending', 'in-progress', 'completed']).withMessage('Invalid status value')
];

// Middleware function to validate request data for updating task
const validateUpdateTask = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // If there are validation errors, return a 400 response with the errors
    return res.status(400).json({ errors: errors.array() });
  }
  // If validation passes, proceed to the next middleware or route handler
  next();
};

module.exports = {
  validateUpdateTaskData,
  validateUpdateTask
};
