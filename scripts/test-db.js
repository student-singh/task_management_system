require('dotenv').config();
const mongoose = require('mongoose');
const path = require('path');
const dbModule = require(path.join(__dirname, '..', 'config', 'database'));

// Debug: show what the module export looks like
console.log('DEBUG: exported from config/database ->', dbModule);
console.log('DEBUG: typeof export ->', typeof dbModule);

// Support both CommonJS (module.exports = fn) and ESM-like default export ({ default: fn })
const connectDB = (typeof dbModule === 'function') ? dbModule : (dbModule && dbModule.default) ? dbModule.default : null;

(async () => {
  if (!connectDB) {
    console.error('Test script: connectDB is not exported as a function from config/database.js');
    console.error('Please ensure `module.exports = connectDB` is present in `config/database.js`.');
    process.exit(1);
  }

  try {
    await connectDB();
    console.log('Test script: DB connection established.');
    // Close the mongoose connection cleanly
    await mongoose.disconnect();
    console.log('Test script: DB connection closed.');
    process.exit(0);
  } catch (err) {
    console.error('Test script: DB connection failed:', err.message || err);
    process.exit(1);
  }
})();
