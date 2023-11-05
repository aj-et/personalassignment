const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const usersController =require('../controllers/users')

router.get('/', usersController.getAll);

router.get('/:id', usersController.getSingle);

router.post('/', [
    check('email').isEmail(),
    check('firstName').notEmpty(),
    check('lastName').notEmpty(),
    check('userName').notEmpty(),
    check('password').isLength({ min: 6 })
], usersController.createUser);

router.put('/:id', [
    check('email').isEmail(),
    check('firstName').notEmpty(),
    check('lastName').notEmpty(),
    check('userName').notEmpty(),
    check('password').isLength({ min: 6 })
], usersController.updateUser);

router.delete('/:id', usersController.deleteUser);

module.exports = router;