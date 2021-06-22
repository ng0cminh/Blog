const express = require('express');
const router = express.Router();
const authController = require('../app/controllers/AuthController');
const verifySignUp = require('../app/middlewares/verifySingup');

// [GET] /register
router.get('/register', authController.register);

// [POST] /register
router.post('/register', [verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted], authController.signup);

// [GET] /login
router.get('/login', authController.login);

// [POST] /login
router.post('/login', authController.signin);

module.exports = router;
