const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const { body } = require('express-validator');  // For validation

// API Routes
router.get('/', employeeController.getEmployees);
router.post('/',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('role').notEmpty().withMessage('Role is required'),
    body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Valid email required')
  ],
  employeeController.createEmployee
);

// View Routes (simple frontend)
router.get('/view', employeeController.renderEmployees);
router.get('/view/create', employeeController.renderCreateEmployee);

module.exports = router;