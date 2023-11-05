const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const authController = require('../controllers/auth');

router.get('/register', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

router.get('/login', (req, res) => {
    res.sendFile(__dirname + '/public/login.html');
});

router.post('/register', [
    check('email').isEmail(),
    check('password').isLength({ min: 6 })
], authController.register);

router.post('/login', authController.login);

module.exports = router;