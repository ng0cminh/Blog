const express = require('express');
const router = express.Router();
const siteController = require('../app/controllers/SiteController');

// [GET] /
router.get('/', siteController.index);

// [GET] /about
router.get('/about', siteController.about);

// [GET] /contact
router.get('/contact', siteController.contact);

module.exports = router;
