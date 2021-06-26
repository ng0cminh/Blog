const express = require('express');
const router = express.Router();
const blogController = require('../app/controllers/BlogController');
const verifyToken = require('../app/middlewares/auth');

// [GET] /blog/new
router.get('/new', verifyToken, blogController.new);

// [POST] /blog/new
router.post('/new', verifyToken, blogController.create);

// [POST] /blog/handle-form-actions
router.post(
   '/handle-form-actions',
   verifyToken,
   blogController.handleFormActions,
);

// [GET] /blog/:id/edit
router.get('/:id/edit', verifyToken, blogController.edit);

// [PUT] /blog/:id/edit
router.put('/:id/edit', verifyToken, blogController.update);

// [PATCH] /blog/:id/restore
router.patch('/:id/restore', verifyToken, blogController.restore);

// [DELETE] /blog/:id/delete
router.delete('/:id/delete', verifyToken, blogController.delete);

router.get('/trash', verifyToken, blogController.trash);

// [DELETE] /blog/:id/delete
router.delete('/:id/destroy', verifyToken, blogController.destroy);

router.get('/:slug', blogController.detail);

// [GET] /blog
router.get('/', blogController.index);

module.exports = router;
