const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: { type: String, 
    required: true },
  email: { type: String,
     required: true, 
     unique: true },
  password: { type: String, 
    required: true },
  role: { type: String, enum: ['admin', 'user'], default: 'user' }
});

// Hash the password before saving the user
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
