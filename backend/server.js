const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // This loads the variables from .env

const express = require('express');
const app = express();
const PORT = 5000;

// Middleware
const corsOptions = {
  origin: 'https://circuit-project-3v6l.vercel.app', // Your Vercel frontend URL
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions)); 
app.use(express.json()); 

// --- Database Connection ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Successfully connected to MongoDB!'))
  .catch(err => console.error('Connection error:', err));

  // API Routes
app.use('/api/users', require('./routes/userRoutes'));

app.use('/api/circuits', require('./routes/circuitRoutes'));


app.get('/', (req, res) => {
  res.send('Hello from the Circuit Repository Backend!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});