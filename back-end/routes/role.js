const express = require('express');
const Task = require('../models/task');
const authMiddleware = require('../middlewear/jwt');
const router = express.Router();

// Create a new task (for authenticated users)
router.post('/', authMiddleware(), async (req, res) => {
  const { description, category } = req.body;
  try {
    const task = new Task({
      user: req.user.userId,
      description,
      category
    });
    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all tasks for the authenticated user
router.get('/', authMiddleware(), async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.userId });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Admin: Get all tasks (for admin users)
router.get('/admin', authMiddleware(['admin']), async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Update a task (for authenticated users)
router.put('/:taskId', authMiddleware(), async (req, res) => {
  const { taskId } = req.params;
  const { description, category, completed } = req.body;
  try {
    let task = await Task.findOne({ _id: taskId, user: req.user.userId });
    if (!task) {
      return res.status(404).json({ msg: 'Task not found' });
    }

    task.description = description || task.description;
    task.category = category || task.category;
    task.completed = typeof completed === 'boolean' ? completed : task.completed;

    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete a task (for authenticated users)
router.delete('/:taskId', authMiddleware(), async (req, res) => {
  const { taskId } = req.params;
  try {
    let task = await Task.findOne({ _id: taskId, user: req.user.userId });
    if (!task) {
      return res.status(404).json({ msg: 'Task not found' });
    }

    await task.remove();
    res.json({ msg: 'Task removed' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Admin: Delete a task (for admin users)
router.delete('/admin/:taskId', authMiddleware(['admin']), async (req, res) => {
  const { taskId } = req.params;
  try {
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ msg: 'Task not found' });
    }

    await task.remove();
    res.json({ msg: 'Task removed' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
