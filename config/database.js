const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      writeConcern: { w: 1 },  // Fix: Use simple acknowledgment for standalone
      // Optional: Add other useful options
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('DB connection error:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;