const Employee = require('../models/Employee');
const { validationResult } = require('express-validator');
const logger = require('morgan');  // We'll set up logging in server.js

// List all employees
exports.getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find().sort({ name: 1 });
    res.status(200).json({ success: true, count: employees.length, data: employees });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create employee
exports.createEmployee = [
  // Validation middleware (body params)
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
  },
  async (req, res) => {
    try {
      const employee = new Employee(req.body);
      await employee.save();
      res.status(201).json({ success: true, data: employee });
    } catch (error) {
      if (error.code === 11000) {
        return res.status(400).json({ success: false, message: 'Email already exists' });
      }
      res.status(400).json({ success: false, message: error.message });
    }
  }
];

// For views: Render employee list
exports.renderEmployees = async (req, res) => {
  try {
    const employees = await Employee.find().sort({ name: 1 });
    res.render('employees/index', { employees, title: 'Employees List' });
  } catch (error) {
    res.status(500).send('Error loading employees');
  }
};

// Render create form (for views)
exports.renderCreateEmployee = (req, res) => {
  res.render('employees/create', { title: 'Create Employee' });
};