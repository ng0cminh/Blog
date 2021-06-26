const express = require('express');
const router = express.Router();
const meController = require('../app/controllers/MeController');

const auth = require('../app/middlewares/Authorization');

router.get('/', auth.isUser, meController.index);

module.exports = router;
