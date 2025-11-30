const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { body, param } = require('express-validator');

// API Routes
router.get('/', taskController.getTasks);
router.get('/:id', taskController.getTask);
router.post('/',
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('status').isIn(['Pending', 'In Progress', 'Completed']).withMessage('Invalid status'),
    body('employeeId').notEmpty().withMessage('Employee ID is required').isMongoId().withMessage('Valid Employee ID required')
  ],
  taskController.createTask
);
router.put('/:id',
  [
    param('id').isMongoId().withMessage('Valid Task ID required'),
    body('status').optional().isIn(['Pending', 'In Progress', 'Completed']).withMessage('Invalid status')
  ],
  taskController.updateTask
);
router.delete('/:id', taskController.deleteTask);

// View Routes
router.get('/view', taskController.renderTasks);
router.get('/view/create', taskController.renderCreateTask);

module.exports = router;