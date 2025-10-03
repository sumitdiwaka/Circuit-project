const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Function to generate a JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d', // Token will be valid for 30 days
  });
};

const registerUser = async (req, res) => {
  try {
    // 1. Get user data from the request body
    const { username, email, password } = req.body;

    // 2. Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // 3. Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. Create the new user in the database
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // 5. If user created successfully, send back user data and a token
    if (user) {
      res.status(201).json({
        _id: user.id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    // 1. Get email and password from the request body
    const { email, password } = req.body;

    // 2. Find the user in the database by their email
    const user = await User.findOne({ email });

    // 3. If user exists AND the passwords match, send back user data and a token
    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user.id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      // If user doesn't exist or password doesn't match
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  registerUser,
    loginUser,
};