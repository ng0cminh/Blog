const Post = require('../models/Post');
const User = require('../models/User');
const arraysToObject = require('../../utils/mongoose');

class BlogController {
   index(req, res, next) {
      Promise.all([
         Post.find({ featured: true }),
         Post.find({ featured: false }),
      ])
         .then(([featured, post]) => {
            res.render('blog', {
               title: 'Blog',
               layout: 'blog',
               featureds: arraysToObject.multi(featured),
               posts: arraysToObject.multi(post),
            });
         })
         .catch(next);
   }

   detail(req, res, next) {
      Post.findOne({ slug: req.params.slug })
         .then((post) => {
            res.render('blog/detail', {
               title: 'Detail',
               layout: 'blog',
               post: arraysToObject.simple(post),
            });
         })
         .catch(next);
   }

   // [GET] /blog/newPost
   newPost(req, res, next) {
      res.render('blog/newPost', {
         title: 'Tạo bài viết mới',
         layout: 'me',
      });
   }

   // [POST] /blog/newPost
   createPost(req, res, next) {
      const formData = req.body;
      if (formData.featured === 'on') {
         formData.featured = true;
      } else {
         formData.featured = false;
      }
      const post = new Post(formData);
      post
         .save()
         .then(() => {
            res.redirect('/blog/newPost');
         })
         .catch(next);
   }

   // [GET] /blog/editPost
   editPost(req, res, next) {
      Post.findOne({ _id: req.params.id })
         .then((post) => {
            res.render('blog/editPost', {
               title: 'Sửa bài viết',
               layout: 'me',
               isComment: post.commentStatus === 'open' ? true : false,
               post: arraysToObject.simple(post),
            });
         })
         .catch(next);
   }

   // [GET] /blog/editPost
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

   // [GET] /blog/trash
   trashPosts(req, res, next) {
      Post.findDeleted()
         .then((post) => {
            res.render('blog/trash', {
               title: 'Thùng rác',
               layout: 'me',
               posts: arraysToObject.multi(post),
            });
         })
         .catch(next);
   }

   // [PATCH] /blog/:id/restorePost
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

module.exports = new BlogController();
