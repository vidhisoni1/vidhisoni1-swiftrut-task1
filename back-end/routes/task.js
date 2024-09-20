const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const Papa = require('papaparse'); // Use papaparse to parse CSV files
const fs = require('fs');
const path = require('path');
const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const { Parser } = require('json2csv'); // Import json2csv to convert tasks into CSV

// Export tasks as CSV
router.get('/export', async (req, res) => {
  try {
    const tasks = await Task.find();

    const fields = ['title', 'description', 'dueDate', 'priority', 'status', 'assignedUser'];
    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(tasks);

    res.header('Content-Type', 'text/csv');
    res.attachment('tasks.csv');
    return res.send(csv);
  } catch (error) {
    console.error('Error exporting tasks:', error);
    res.status(500).send('Server Error');
  }
});




router.get('/', async (req, res) => {
  try {
    const { status, priority, dueDate, assignedUser, sortBy = 'dueDate', order = 'asc' } = req.query;
    
    // Build the query object
    const query = {};
    if (status) query.status = status;
    if (priority) query.priority = priority;
    if (dueDate) query.dueDate = { $gte: new Date(dueDate) }; // Find tasks due on or after this date
    if (assignedUser) query.assignedUser = assignedUser;

    // Sort options
    const sortOptions = {};
    sortOptions[sortBy] = order === 'desc' ? -1 : 1;

    const tasks = await Task.find(query).sort(sortOptions);
    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).send('Server Error');
  }
});

// Import tasks from CSV
router.post('/import', upload.single('file'), async (req, res) => {
  try {
    const filePath = path.join(__dirname, '..', req.file.path);
    const fileContent = fs.readFileSync(filePath, 'utf8');

    // Parse CSV file
    const { data } = Papa.parse(fileContent, { header: true });

    const validationErrors = [];
    const importedTasks = [];

    // Validate and save tasks
    for (const row of data) {
      const { title, description, dueDate, priority, status, assignedUser } = row;

      // Validate required fields
      if (!title || !dueDate || !priority || !status) {
        validationErrors.push({ row: row, error: 'Missing required fields' });
        continue;
      }

      // Validate date (due date cannot be in the past)
      if (new Date(dueDate) < new Date()) {
        validationErrors.push({ row: row, error: 'Due date is in the past' });
        continue;
      }

      // Check for duplicate task
      const existingTask = await Task.findOne({ title });
      if (existingTask) {
        validationErrors.push({ row: row, error: 'Task title already exists' });
        continue;
      }

      const newTask = new Task({
        title,
        description,
        dueDate,
        priority,
        status,
        assignedUser,
      });

      await newTask.save();
      importedTasks.push(newTask);
    }

    // Return validation errors or success message
    if (validationErrors.length > 0) {
      res.status(400).json({ message: 'Some tasks failed to import', validationErrors });
    } else {
      res.status(200).json({ message: 'All tasks imported successfully', importedTasks });
    }
  } catch (error) {
    console.error('Error importing tasks:', error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;