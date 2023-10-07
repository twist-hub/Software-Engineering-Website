const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
app.use(bodyParser.json());

// Mock database for user authentication
const users = [
  {
    id: 1,
    username: 'john@example.com',
    password: '$2b$10$eJu9i8ll9hK0jpmI4gch8eV3T0p2v2FTRcJyVnXtwF9NTXJcvX.LO', // Hashed password for 'password123'
  },
];

const secretKey = 'your_secret_key'; // Replace with your own secret key

// Login endpoint
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  // Find user by username
  const user = users.find((user) => user.username === username);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  // Compare the provided password with the stored hashed password
  bcrypt.compare(password, user.password, (err, result) => {
    if (err || !result) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user.id, username: user.username }, secretKey);

    // Send the token as a response
    res.json({ token });
  });
});

// Middleware to authenticate requests
const authenticate = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    // Verify and decode the token
    const decoded = jwt.verify(token, secretKey);

    // Attach the decoded user information to the request object
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

// Protected dashboard endpoint
app.get('/api/dashboard', authenticate, (req, res) => {
  // Access the authenticated user's information
  const { id, username } = req.user;

  // Return the user's information
  res.json({ id, username });
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});