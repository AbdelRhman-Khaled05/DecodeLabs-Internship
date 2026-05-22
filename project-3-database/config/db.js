// ============================================================
//  config/db.js — MongoDB connection via Mongoose
//  Pillar 2: The Bridge — Integration & Connection
// ============================================================

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    process.exit(1); // Exit process if DB fails
  }
};

module.exports = connectDB;
