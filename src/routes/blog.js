const express = require('express');
const router = express.Router();
const blogController = require('../app/controllers/BlogController');

router.get('/:slug', blogController.detail);

// define the home page route
router.get('/', blogController.index);

module.exports = router;
