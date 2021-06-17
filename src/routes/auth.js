const express = require('express');

const router = express.Router();

const authController = require('../app/controllers/AuthController');

//@route POST api/auth/register
//@desc Register user
//@access Public

router.post('/register', authController.register);

module.exports = router;
