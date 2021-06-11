const express = require('express');
const router = express.Router();
const blogController = require('../app/controllers/BlogController');

// [GET] /me/newPost
router.get('/newPost', blogController.newPost);

router.post('/newPost', blogController.createPost);

router.post('/handle-form-actions', blogController.handleFormActions);

// [GET] /me/:id/editPost
router.get('/:id/editPost', blogController.editPost);

// [PUT] /me/:id/editPost
router.put('/:id/editPost', blogController.updatePost);

// [PATCH] /me/:id/restorePost
router.patch('/:id/restorePost', blogController.restorePost);

// [DELETE] /me/:id/deletePost
router.delete('/:id/deletePost', blogController.deletePost);

router.get('/trash', blogController.trashPosts);

// [DELETE] /me/:id/deletePost
router.delete('/:id/destroyPost', blogController.destroyPost);

router.get('/:slug', blogController.detail);
// define the home page route
router.get('/', blogController.index);

module.exports = router;
