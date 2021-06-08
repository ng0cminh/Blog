const Post = require('../models/Post');

class SiteController {
   index(req, res) {
      res.render('home');
   }

   about(req, res) {
      res.render('about');
   }

   contact(req, res) {
      res.render('contact');
   }
}

module.exports = new SiteController();
