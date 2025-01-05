const express = require('express');
const { body, validationResult } = require("express-validator"); // Import validationResult
const router = express.Router();
const { register, login, getUserprofile, logout } = require('../controller/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// Register route for user
router.post('/register', [
    body('fullname').isLength({ min: 3 }).withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
], (req, res, next) => {
    const errors = validationResult(req); // Check validation errors
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}, register);

// Login route for user
router.post('/login', [
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
], (req, res, next) => {
    const errors = validationResult(req); // Check validation errors
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}, login);

// Profile route for user
router.get('/profile', authMiddleware.authUser, getUserprofile);

// Logout route for user
router.get('/logout', authMiddleware.authUser, logout);

module.exports = router;
