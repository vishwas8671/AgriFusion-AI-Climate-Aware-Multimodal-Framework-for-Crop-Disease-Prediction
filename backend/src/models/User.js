const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['researcher', 'agronomist', 'student', 'evaluator'],
    default: 'researcher'
  },
  institution: {
    type: String,
    default: 'Department of Computer Science & Engineering'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Avoid re-compiling model if already registered
module.exports = mongoose.models.User || mongoose.model('User', userSchema);
