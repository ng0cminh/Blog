const express = require('express');
const router = express.Router();
const blogController = require('../app/controllers/BlogController');

const auth = require('../app/middlewares/Authorization');

// [GET] /blog/new
router.get('/new', auth.isUser, blogController.new);

// [POST] /blog/new
router.post('/new', auth.isUser, blogController.create);

// [POST] /blog/handle-form-actions
router.post('/handle-form-actions', blogController.handleFormActions);

// [GET] /blog/:id/edit
router.get('/:id/edit', auth.isUser, blogController.edit);

// [PUT] /blog/:id/edit
router.put('/:id/edit', auth.isUser, blogController.update);

// [PATCH] /blog/:id/restore
router.patch('/:id/restore', auth.isUser, blogController.restore);

// [DELETE] /blog/:id/delete
router.delete('/:id/delete', auth.isUser, blogController.delete);

router.get('/trash', auth.isUser, blogController.trash);

// [DELETE] /blog/:id/delete
router.delete('/:id/destroy', auth.isAdmin, blogController.destroy);

router.get('/:slug', blogController.detail);

// [GET] /blog
router.get('/', blogController.index);

module.exports = router;
