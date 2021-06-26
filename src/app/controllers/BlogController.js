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
   // [GET] /blog/trash
   async trash(req, res, next) {
      try {
         const roles = req.roles;
         if(roles.includes('admin') || roles.includes('moderator')) {
           var post = await Post.findDeleted().populate('user')
         } else {
            var post = await Post.findDeleted({user: req.userId}).populate('user')
         }
         const user = await User.findOne({_id: req.userId})

         if(post) {
            res.render('blog/trash', {
               title: 'Thùng rác',
               layout: 'me',
               user: arraysToObject.simple(user),
               posts: arraysToObject.multi(post),
            });
         }

      } catch (error) {
         res.status(500).json('loi sever')
      }
     
   }
   // [GET] /blog/:slug
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

   // [GET] /blog/new
   new(req, res, next) {
      res.render('blog/new', {
         title: 'Tạo bài viết mới',
         layout: 'me',
      });
   }

   // [POST] /blog/new
   create(req, res, next) {
      const formData = req.body;
      formData.user = req.userId;

      if (formData.featured === 'on') {
         formData.featured = true;
      } else {
         formData.featured = false;
      }
      const post = new Post(formData);
      post
         .save()
         .then(() => {
            res.redirect('/blog/new');
         })
         .catch(next);
   }

   // [GET] /blog/edit
   edit(req, res, next) {
      Post.findOne({ _id: req.params.id})
         .then((post) => {
            res.render('blog/edit', {
               title: 'Sửa bài viết',
               layout: 'me',
               isComment: post.commentStatus === 'open' ? true : false,
               post: arraysToObject.simple(post),
            });
         })
         .catch(next);
   }

   // [POST] /blog/edit
   update(req, res, next) {
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

   // [DELETE] /blog/:id/deletePost
   delete(req, res, next) {
      Post.delete({ _id: req.params.id })
         .then(() => {
            res.redirect('back');
         })
         .catch(next);
   }

   // [PATCH] /blog/:id/restore
   restore(req, res, next) {
      Post.restore({ _id: req.params.id })
         .then(() => {
            res.redirect('back');
         })
         .catch(next);
   }

   // [DELETE] /blog/:id/destroy
   destroy(req, res, next) {
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
            const roles = req.roles;
            if(roles.includes('admin')) {
               Post.deleteMany({ _id: { $in: req.body.postIds } })
               .then(() => {
                  res.redirect('back');
               })
               .catch(next);
            }else {
               res.json('ban khong co quyen')
            }
            
            break;
         default:
            res.redirect('back');
      }
   }
}

module.exports = new BlogController();
