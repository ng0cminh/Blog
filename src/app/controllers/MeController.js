const Post = require('../models/Post');
const arraysToObject = require('../../utils/mongoose');

class MeController {
   index(req, res, next) {
      Promise.all([Post.find(), Post.countDocumentsDeleted()])
         .then(([post, deleteCount]) => {
            res.render('me', {
               layout: 'me',
               deleteCount,
               posts: arraysToObject.multi(post),
            });
         })
         .catch(next);
   }
   // [GET] /me/newPost
   newPost(req, res, next) {
      res.render('me/newPost', { layout: 'me' });
   }

   // [POST] /me/newPost
   createPost(req, res, next) {
      const formData = req.body;
      const post = new Post(formData);
      post
         .save()
         .then(() => res.redirect('/me/newPost'))
         .catch(next);
   }

   // [GET] /me/editPost
   editPost(req, res, next) {
      Post.findOne({ _id: req.params.id })
         .then((post) => {
            res.render('me/editPost', {
               layout: 'me',
               post: arraysToObject.simple(post),
            });
         })
         .catch(next);
   }

   // [GET] /me/editPost
   updatePost(req, res, next) {
      const formData = req.body;
      if (formData.featured === 'on') {
         formData.featured = true;
      } else {
         formData.featured = false;
      }

      Post.updateOne({ _id: req.params.id }, formData)
         .then(() => {
            res.redirect('/me');
         })
         .catch(next);
   }

   deletePost(req, res, next) {
      Post.delete({ _id: req.params.id })
         .then(() => {
            res.redirect('back');
         })
         .catch(next);
   }

   // [GET] /me/trash/posts
   trashPosts(req, res, next) {
      Post.findDeleted()
         .then((post) => {
            res.render('me/trash', {
               layout: 'me',
               posts: arraysToObject.multi(post),
            });
         })
         .catch(next);
   }

   // [PATCH] /me/:id/restorePost
   restorePost(req, res, next) {
      Post.restore({ _id: req.params.id })
         .then(() => {
            res.redirect('back');
         })
         .catch(next);
   }

   destroyPost(req, res, next) {
      Post.deleteOne({ _id: req.params.id })
         .then(() => {
            res.redirect('back');
         })
         .catch(next);
   }

   handleFormActions(req, res, next) {
      switch (req.body.action) {
         case 'delete':
            Post.delete({ _id: { $in: req.body.postIds } })
               .then(() => {
                  res.redirect('back');
               })
               .catch(next);
            break;
         case 'restore':
            Post.restore({ _id: { $in: req.body.postIds } })
               .then(() => {
                  res.redirect('back');
               })
               .catch(next);
            break;
         case 'destroy':
            Post.deleteMany({ _id: { $in: req.body.postIds } })
               .then(() => {
                  res.redirect('back');
               })
               .catch(next);
            break;
         default:
            res.redirect('back');
      }
   }
}

module.exports = new MeController();
