const Post = require('../models/Post');
const arraysToObject = require('../../utils/mongoose');

class BlogController {
   index(req, res, next) {
      Post.find({})
         .then((post) => {
            res.render('blog', {
               layout: 'blog',
               posts: arraysToObject.multi(post),
            });
         })
         .catch(next);
   }

   detail(req, res, next) {
      Post.findOne({ slug: req.params.slug })
         .then((post) => {
            res.render('blog/detail', {
               layout: 'blog',
               post: arraysToObject.simple(post),
            });
         })
         .catch(next);
   }
}

module.exports = new BlogController();
