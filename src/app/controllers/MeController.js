const Post = require('../models/Post');
const arraysToObject = require('../../utils/mongoose');

class MeController {
   index(req, res, next) {
      Promise.all([Post.find({}).sortable(req), Post.countDocumentsDeleted()])
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
