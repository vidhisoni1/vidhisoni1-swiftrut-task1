const Task = require('../models/Task');

const getTasks = async (req, res) => {
  try {
    const { status, priority, dueDate, assignedUser, sortBy = 'dueDate', order = 'asc' } = req.query;
    
    const query = {};

    // Apply filters
    if (status) query.status = status;
    if (priority) query.priority = priority;
    if (dueDate) query.dueDate = { $gte: new Date(dueDate) };
    if (assignedUser) query.assignedUser = assignedUser;

    const options = {
        skip: (page - 1) * limit,
        limit: parseInt(limit),
        sort: { [sortBy]: order === 'asc' ? 1 : -1 }
      };
  
      // Fetch tasks with pagination, filters, and sorting
      const tasks = await Task.find(query, null, options);
      const totalTasks = await Task.countDocuments(query); // Count total tasks for pagination
  
      res.status(200).json({
        tasks,
        totalPages: Math.ceil(totalTasks / limit),
        currentPage: page
      });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching tasks', error });
    }
  };
module.exports = {
  getTasks,
};
