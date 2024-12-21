const express = require('express');
const router = express.Router();
const { body } = require("express-validator");
const { register, login, getUserprofile, logout } = require('../controller/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/register', [
    body('fullname').isLength({ min: 3 }).withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
], register);

router.post('/login', [
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
], login);

router.get('/profile', authMiddleware.authUser, getUserprofile);

router.get('/logout', authMiddleware.authUser, logout);

module.exports = router;