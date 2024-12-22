const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Ensure bcryptjs is required
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const captainRoutes = require('./routes/captain.routes');
const userRoutes = require('./routes/user.routes');
require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());

app.use('/captains', captainRoutes);
app.use('/users', userRoutes);

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Database connection error:', err);
    });

