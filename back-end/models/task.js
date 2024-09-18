const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId,
     ref: 'User', required: true },
  description: { type: String,
     required: true },
  category: { type: String,
     required: true },
  completed: { type: Boolean, 
    default: false }
}, { timestamps: true });

const Task = mongoose.model('Task', TaskSchema);
module.exports = Task;
