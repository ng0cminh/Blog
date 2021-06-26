const express = require('express');
const router = express.Router();
const userController = require('../app/controllers/UserController');

const checkSignup = require('../app/middlewares/checkSignup');

// [GET] /
router.get('/', userController.index);

// [GET] /login
router.get('/login', userController.login);

// [GET] /register
router.get('/register', userController.register);

// [GET] /logout
router.get('/logout', userController.logout);

// [POST] /signin
router.post('/signin', userController.signin);

// [POST] /signup
router.post('/signup', checkSignup, userController.signup);

module.exports = router;
