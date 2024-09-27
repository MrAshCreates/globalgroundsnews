// backend/controllers/userController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = new User({ username, password });
    await user.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ token, user: { id: user._id, username: user.username, anonymous: user.anonymous } });
  } catch (error) {
    res.status(400).json({ error: 'Registration failed' });
  }
};

exports.loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) throw Error('User not found');
    const isMatch = await user.comparePassword(password);
    if (!isMatch) throw Error('Incorrect password');
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ token, user: { id: user._id, username: user.username, anonymous: user.anonymous } });
  } catch (error) {
    res.status(400).json({ error: 'Login failed' });
  }
};