const User = require('../models/User');
const slug = require('mongoose-slug-generator');

class UserController {
   register(req, res, next) {
      res.render('register', {
         title: 'Đăng ký',
      });
   }

   createUser(req, res, next) {
      const formData = req.body;
      const user = new User(formData);

      if (formData.password === formData.confirmPassword) {
         user
            .save()
            .then(() => {
               res.redirect('/login');
            })
            .catch(next);
      } else {
         res.json({
            messenger: 'Password và Confirm Password không khớp',
         });
      }
   }

   login(req, res, next) {
      res.render('login', {
         title: 'Đăng nhập',
      });
   }
}

module.exports = new UserController();
