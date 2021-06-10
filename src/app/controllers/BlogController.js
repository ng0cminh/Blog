const Post = require('../models/Post');
const arraysToObject = require('../../utils/mongoose');

class BlogController {
   index(req, res, next) {
      
      Promise.all([Post.find({featured: true}),Post.find({featured: false})])
         .then(([featured, post]) => {
            res.render('blog', {
               layout: 'blog',
               featureds: arraysToObject.multi(featured),
               posts: arraysToObject.multi(post),
            });
         })
         .catch(next)
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
