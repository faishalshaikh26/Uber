const express = require('express');
const { body } = require('express-validator'); // Import body from express-validator
const router = express.Router();
const captainController = require('../controller/captain.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const bcrypt = require('bcryptjs'); // Ensure bcryptjs is required
const jwt = require('jsonwebtoken');

router.post('/register', [
    body('fullname.firstname').isLength({ min: 3 }).withMessage('Firstname is required'),
    body('fullname.lastname').isLength({ min: 3 }).withMessage('Lastname is required'),
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('vehicle.color').isLength({ min: 3 }).withMessage('Color is required'),
    body('vehicle.plate').isLength({ min: 3 }).withMessage('Plate is required'),
    body('vehicle.capacity').isNumeric().withMessage('Capacity is required'),
    body('vehicle.vehicleType').isIn(['motorcycle','car','auto']).withMessage('Invalid vehicle type')
], captainController.registerCaptain);

router.post('/login', [
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
], captainController.loginCaptain);

router.get('/profile', authMiddleware.authCaptain,captainController.getProfile);
router.get('/logout', authMiddleware.authCaptain,captainController.logout);

module.exports = router;