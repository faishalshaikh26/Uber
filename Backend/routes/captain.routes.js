const express = require('express');
const router = express.Router();
const captainController = require('../controller/captain.controller');

router.post('/register', captainController.register);
router.post('/login', captainController.login);
router.get('/profile', captainController.getProfile);
router.get('/logout', captainController.logout);

module.exports = router;