const express = require('express');
const router = express.Router();
const meController = require('../app/controllers/MeController');

// [GET] /me/newPost
router.get('/newPost', meController.newPost);

router.post('/newPost', meController.createPost);

// [GET] /me/:id/editPost
router.get('/:id/editPost', meController.editPost);

// [PUT] /me/:id/editPost
router.put('/:id/editPost', meController.updatePost);

// [PATCH] /me/:id/restorePost
router.patch('/:id/restorePost', meController.restorePost);

// [DELETE] /me/:id/deletePost
router.delete('/:id/deletePost', meController.deletePost);

router.get('/trash/posts', meController.trashPosts);

// [DELETE] /me/:id/deletePost
router.delete('/:id/destroyPost', meController.destroyPost);

router.get('/', meController.index);

module.exports = router;
