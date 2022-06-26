const express = require('express');
const router = express.Router();

const TaskController = require('../controllers/task.controller');
const { findTask } = require('../middlewares/taskMW');

// localhost:****/api/...

router.post('/tasks', TaskController.createTask);
router.get('/tasks', TaskController.findTasks);
router.get('/tasks/:id', TaskController.findTaskById);
router.put('/tasks/:id', TaskController.updateTask);
router.delete('/tasks/:id', TaskController.deleteTask);
router.put('/tasks/v2/:id', findTask, TaskController.updateTaskV2);
router.delete('/tasks/v2/:id', findTask, TaskController.deleteTaskV2);

module.exports = router;
