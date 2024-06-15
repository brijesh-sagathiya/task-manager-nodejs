const { validate, validateTaskData } = require("./createTask.zod.dto");
const {
  validateUpdateTaskData,
  validateUpdateTask,
} = require("./updatedTask.zod.dto");

module.exports = {
  validate,
  validateUpdateTask,
  validateTaskData,
  validateUpdateTaskData,
};
