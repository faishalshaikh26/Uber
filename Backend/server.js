require('dotenv').config(); // Load environment variables from .env

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const captainRoutes = require('./routes/captain.routes');
const userRoutes = require('./routes/user.routes'); // Correct file path

const app = express();

app.use(express.json()); // Middleware for JSON parsing
app.use(cookieParser()); // Middleware for cookie parsing

app.use('/captains', captainRoutes);
app.use('/users', userRoutes);

const PORT = process.env.PORT || 4000;

mongoose.connect(process.env.DB_CONNECT)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    })
    .catch(err => {
        console.error('Database connection error:', err);
    });
