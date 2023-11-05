const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const authController = require('../controllers/auth');

router.post('/register', [
    check('email').isEmail(),
    check('password').isLength({ min: 6 })
], authController.register);

router.post('/login', authController.login);

module.exports = router;