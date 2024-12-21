const express = require('express');
const router = express.Router();
const { body } = require("express-validator");
const { register, login } = require('../controller/user.controller');

router.post('/register', [
    body('fullname').isLength({ min: 3 }).withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 5 }).withMessage('Password is required')
], register);

router.post('/login', [
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 5 }).withMessage('Password is required')
], login);

module.exports = router;