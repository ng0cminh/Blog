const Post = require('../models/Post');

class SiteController {
   index(req, res, next) {
      res.render('home', {
         title: 'Trang chủ',
      });
   }

   about(req, res, next) {
      res.render('about', {
         title: 'Giới thiệu',
      });
   }

   contact(req, res, next) {
      res.render('contact', {
         title: 'Liên hệ',
      });
   }
}

module.exports = new SiteController();
