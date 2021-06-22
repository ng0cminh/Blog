const express = require('express');
const router = express.Router();
const blogController = require('../app/controllers/BlogController');
const verifyToken = require('../app/middlewares/auth')

// [GET] /blog/new
router.get('/new', blogController.new);

// [POST] /blog/new
router.post('/new', blogController.create);

// [POST] /blog/handle-form-actions
router.post('/handle-form-actions', blogController.handleFormActions);

// [GET] /blog/:id/edit
router.get('/:id/edit', blogController.edit);

// [PUT] /blog/:id/edit
router.put('/:id/edit', blogController.update);

// [PATCH] /blog/:id/restore
router.patch('/:id/restore', blogController.restore);

// [DELETE] /blog/:id/delete
router.delete('/:id/delete', blogController.delete);

router.get('/trash', blogController.trash);

// [DELETE] /blog/:id/delete
router.delete('/:id/destroy', blogController.destroy);

router.get('/:slug', blogController.detail);

// [GET] /blog
router.get('/', blogController.index);

module.exports = router;
