const express = require('express');
const color = require('colors');
const dotenv = require('dotenv').config();
const cors = require('cors');
const{errorHandler} = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');

const port = process.env.PORT || 5000;

connectDB();

const app = express();

// Use CORS middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/goal', require('./routes/goalRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/opportunities', require('./routes/opportunityRoutes'));
app.use('/api/sponsorships', require('./routes/sponsorshipRoutes'));

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

