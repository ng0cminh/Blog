const Post = require('../models/Post');
const arraysToObject = require('../../utils/mongoose');

class MeController {
   index(req, res, next) {
      
      let postQuery = Post.find({});

      if(req.query.hasOwnProperty('_sort')) {
         postQuery = postQuery.sort({
            [req.query.column]: req.query.type
         });
      }

      Promise.all([postQuery, Post.countDocumentsDeleted()])
         .then(([post, deleteCount]) => {
            res.render('me', {
               title: 'Danh Sách bài viết',
               layout: 'me',
               deleteCount,
               posts: arraysToObject.multi(post),
            });
         })
         .catch(next);
   }
}

module.exports = new MeController();
