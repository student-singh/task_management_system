const mongoose = require('mongoose');
const connectDB = require('../config/database');
const Employee = require('../models/Employee');
const Task = require('../models/Task');

connectDB();

const seedData = async () => {
  try {
    // Clear existing data
    await Employee.deleteMany();
    await Task.deleteMany();

    // Sample Employees
    const employees = await Employee.insertMany([
      { name: 'John Doe', role: 'Developer', email: 'john@example.com' },
      { name: 'Jane Smith', role: 'Manager', email: 'jane@example.com' }
    ]);

    // Sample Tasks (linked to employees)
    await Task.insertMany([
      { title: 'Fix login bug', description: 'Resolve auth issues', status: 'In Progress', employeeId: employees[0]._id },
      { title: 'Review PR', description: 'Code review for feature X', status: 'Completed', employeeId: employees[1]._id },
      { title: 'Update docs', description: 'Add API docs', status: 'Pending', employeeId: employees[0]._id }
    ]);

    console.log('Sample data seeded');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedData();