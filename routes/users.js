const express = require('express');
const router = express.Router();
const passport = require('passport');

// Middleware to protect routes
const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/'); // Redirect to login page if not authenticated
};

const usersController =require('../controllers/users')

router.get('/', isAuthenticated, usersController.getAll);

router.get('/:id', isAuthenticated, usersController.getSingle);

router.post('/', isAuthenticated, usersController.createUser);

router.put('/:id', isAuthenticated, usersController.updateUser);

router.delete('/:id', isAuthenticated, usersController.deleteUser);

module.exports = router;