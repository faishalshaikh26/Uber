const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const connectToDB = require('./DB/db');
const userRoute = require('./routes/user.routes.js'); // Correct file path
const captainRoute = require('./routes/captain.routes.js');

connectToDB();

// Middleware setup
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.get('/', (req, res) => {
    res.send('Hello World');
});
app.use('/users', userRoute);
app.use('/captains', captainRoute);

// Global Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err); // Log error details
    res.status(500).json({
        message: "Something went wrong",
        error: err.message || "Internal Server Error",
    });
});

// Port Configuration
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
