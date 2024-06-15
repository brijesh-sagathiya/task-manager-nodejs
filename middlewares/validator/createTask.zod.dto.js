const { body, validationResult } = require("express-validator");

// Validation rules for task data
const validateTaskData = [
  body("userId").isInt().withMessage("User ID must be an integer"),
  body("title").notEmpty().withMessage("Title is required"),
  body("description").notEmpty().withMessage("Description is required"),
];

// Middleware function to validate request data
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // If there are validation errors, return a 400 response with the errors
    return res.status(400).json({ errors: errors.array() });
  }
  // If validation passes, proceed to the next middleware or route handler
  next();
};

module.exports = {
  validateTaskData,
  validate,
};
