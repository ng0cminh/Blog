const express = require('express');
const router = express.Router();
const categoryController = require('../app/controllers/CategoryController');

const auth = require('../app/middlewares/Authorization');


// [GET] /blog/category
router.get('/new', auth.isModerator, categoryController.new);

// [POST] /blog/category
router.post('/create', auth.isModerator, categoryController.create);


module.exports = router;
