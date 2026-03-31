// models/Task.js
const mongoose = require("mongoose");

// Schema
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  }
});

// Model
const Task = mongoose.model("Task", taskSchema);

module.exports = Task;