const mongoose = require('mongoose');

// In-memory persistent collection store for when MongoDB is not running locally
const memoryStore = {
  users: [],
  analyses: []
};

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/agrifusion_ai';
  try {
    // Attempt Mongoose connection with 3-second timeout
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 3000
    });
    console.log(`[Database] Successfully connected to MongoDB: ${mongoose.connection.host}`);
    return true;
  } catch (err) {
    console.warn(`[Database] Notice: MongoDB not reachable (${err.message}).`);
    console.log(`[Database] Activating High-Reliability In-Memory Store for academic demonstration.`);
    return false;
  }
};

module.exports = {
  connectDB,
  memoryStore
};
