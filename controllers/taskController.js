const Task = require('../models/Task');
const Employee = require('../models/Employee');
const { validationResult } = require('express-validator');

// List tasks (with filters: status or employeeId)
exports.getTasks = async (req, res) => {
  try {
    const { status, employeeId } = req.query;
    let filter = {};
    if (status) filter.status = status;
    if (employeeId) filter.employeeId = employeeId;

    const tasks = await Task.find(filter)
      .populate('employeeId', 'name email')  // Join employee details
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: tasks.length, data: tasks });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create task
exports.createTask = [
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
  },
  async (req, res) => {
    try {
      // Check if employee exists
      const employee = await Employee.findById(req.body.employeeId);
      if (!employee) {
        return res.status(400).json({ success: false, message: 'Employee not found' });
      }

      const task = new Task(req.body);
      await task.save();
      const populatedTask = await Task.findById(task._id).populate('employeeId', 'name email');
      res.status(201).json({ success: true, data: populatedTask });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
];

// Update task
exports.updateTask = [
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
  },
  async (req, res) => {
    try {
      const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        .populate('employeeId', 'name email');
      if (!task) {
        return res.status(404).json({ success: false, message: 'Task not found' });
      }
      res.status(200).json({ success: true, data: task });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
];

// Delete task
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }
    res.status(200).json({ success: true, message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get single task
exports.getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate('employeeId', 'name email');
    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }
    res.status(200).json({ success: true, data: task });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// For views: Render task list with filters
exports.renderTasks = async (req, res) => {
  try {
    const { status, employeeId } = req.query;
    let filter = {};
    if (status) filter.status = status;
    if (employeeId) filter.employeeId = employeeId;

    const tasks = await Task.find(filter).populate('employeeId', 'name email').sort({ createdAt: -1 });
    const employees = await Employee.find();  // For dropdown in form
    res.render('tasks/index', { tasks, employees, filter: req.query, title: 'Tasks List' });
  } catch (error) {
    res.status(500).send('Error loading tasks');
  }
};

// Render create task form
exports.renderCreateTask = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.render('tasks/create', { employees, title: 'Create Task', error: null });
  } catch (error) {
    res.status(500).send('Error loading form');
  }
};