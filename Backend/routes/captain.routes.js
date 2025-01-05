const express = require('express');
const { body, validationResult } = require('express-validator'); // Import validationResult
const router = express.Router();
const { registerCaptain, loginCaptain, getCaptainProfile, logoutCaptain } = require('../controller/captain.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// Register route for captain
router.post('/register', [
    body('fullname.firstname').isLength({ min: 3 }).withMessage('Firstname must be at least 3 characters'),
    body('fullname.lastname').isLength({ min: 3 }).withMessage('Lastname must be at least 3 characters'),
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('vehicle.color').isLength({ min: 3 }).withMessage('Color is required'),
    body('vehicle.plate').isLength({ min: 3 }).withMessage('Plate number must be at least 3 characters'),
    body('vehicle.capacity').isNumeric().withMessage('Capacity must be a number'),
    body('vehicle.vehicleType').isIn(['motorcycle', 'car', 'auto']).withMessage('Invalid vehicle type')
], (req, res, next) => {
    const errors = validationResult(req); // Check validation errors
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}, registerCaptain);

// Login route for captain
router.post('/login', [
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
], (req, res, next) => {
    const errors = validationResult(req); // Check validation errors
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}, loginCaptain);

// Profile route for captain
router.get('/profile', authMiddleware.authCaptain, getCaptainProfile);

// Logout route for captain
router.get('/logout', authMiddleware.authCaptain, logoutCaptain);

module.exports = router;
