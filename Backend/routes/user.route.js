const express = require('express');
const router = express.Router();
const {body} = require("express-validator");
const userController = require('../controller/user.controller');



router.post('/register',[
    body('fullname').isLength({min:3}).withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({min:5}).withMessage('Password is required')
]
,userController.registerUser);





module.exports = router;