const Post = require('../models/Post');
const User = require('../models/User');
const arraysToObject = require('../../utils/mongoose');

class MeController {
   index(req, res, next) {
      const roles = req.roles;
      
      if(roles.includes('admin') || roles.includes('moderator')) {
         var posts = Post.find().populate('user').sortable(req);
         var deleteCounts = Post.countDocumentsDeleted();
      } else {
         var posts = Post.find({user: req.userId}).populate('user').sortable(req);
         var deleteCounts = Post.countDocumentsDeleted({user: req.userId});
      }
      
      const users = User.findOne({_id: req.userId})

       Promise.all([posts,deleteCounts,users])
         .then(([post, deleteCount, user]) => {

            res.render('me', {
               title: 'Danh Sách bài viết',
               layout: 'me',
               deleteCount,
               user: arraysToObject.simple(user),
               posts: arraysToObject.multi(post),
            });
         })
         .catch(next);
   }
}

module.exports = new MeController();
