const express = require('express');
const User = require('../models/user')
const authMiddleware = require('../middlewear/jwt');
const router = express.Router();

// Admin: Get all users
router.get('/users', authMiddleware(['admin']), async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Admin: Assign role to a user
router.put('/users/:userId/role', authMiddleware(['admin']), async (req, res) => {
  const { userId } = req.params;
  const { role } = req.body;

  if (!['admin', 'user'].includes(role)) {
    return res.status(400).json({ msg: 'Invalid role' });
  }

  try {
    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    user.role = role;
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
