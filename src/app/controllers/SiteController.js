const Post = require('../models/Post');

class SiteController {
   index(req, res) {
      res.render('home', {
         title: 'Trang chủ',
      });
   }

   about(req, res) {
      res.render('about', {
         title: 'Giới thiệu',
      });
   }

   contact(req, res) {
      res.render('contact', {
         title: 'Liên hệ',
      });
   }
}

module.exports = new SiteController();
