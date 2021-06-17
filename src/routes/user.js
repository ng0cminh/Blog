const express = require('express');
const router = express.Router();
const siteController = require('../app/controllers/UserController');

// [GET] /register
router.get('/register', siteController.register);

// [POST] /register
router.post('/register', siteController.createUser);

// [GET] /login
router.get('/login', siteController.login);

// [POST] /login
router.post('/login', siteController.loginValidate);

module.exports = router;
