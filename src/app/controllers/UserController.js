const User = require('../models/User');
const Role = require('../models/Role');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

class UserController {
   // [GET] /
   async index(req, res, next) {
      try {
         const user = await User.findById(req.userId);

         if (!user) {
            res.redirect('/users/login');
         } else {
            res.redirect('/me');
         }
      } catch (error) {
         res.status(500).json({
            success: false,
            message: 'Internal server error',
         });
      }
   }

   // [GET] /users/login
   async login(req, res, next) {
      var token = req.cookies.token;
      if (!token) {
         return res.render('users/login', {
            title: 'Đăng nhập',
         });
      } else {
         try {
            const decoded = await jwt.verify(
               token,
               process.env.ACCESS_TOKEN_SECRET,
            );
            if (decoded) {
               const userId = decoded.userId;
               const user = await User.findById(userId);

               if (!user) {
                  return res.render('users/login', {
                     title: 'Đăng nhập',
                  });
               } else {
                  return res.redirect('/me');
               }
            } else {
               return res.render('users/login', {
                  title: 'Đăng nhập',
               });
            }
         } catch (error) {
            res.status(500).json({
               success: false,
               message: 'Internal server error',
            });
         }
      }
   }

   // [GET] /users/register
   async register(req, res, next) {
      var token = req.cookies.token;
      if (!token) {
         return res.render('users/register', {
            title: 'Đăng nhập',
         });
      } else {
         try {
            const decoded = await jwt.verify(
               token,
               process.env.ACCESS_TOKEN_SECRET,
            );
            if (decoded) {
               const userId = decoded.userId;
               const user = await User.findById(userId);

               if (!user) {
                  return res.render('users/register', {
                     title: 'Đăng ký',
                  });
               } else {
                  return res.redirect('/me');
               }
            } else {
               return res.render('users/register', {
                  title: 'Đăng ký',
               });
            }
         } catch (error) {
            res.status(500).json({
               success: false,
               message: 'Internal server error',
            });
         }
      }
   }

   // [GET] /users/logout
   logout(req, res, next) {
      res.cookie('token', '');
      res.redirect('/');
   }

   // [POST] /users/register
   async signup(req, res, next) {
      const formData = req.body;
      formData.password = bcrypt.hashSync(req.body.password, 8);

      try {
         if (req.body.roles) {
            const roles = await Role.find({ name: { $in: req.body.roles } });
            if (roles) {
               formData.roles = roles.map((role) => role._id);
               const user = new User(formData);
               await user.save();

               return res.redirect('/users/login');
            }
         } else {
            const role = await Role.findOne({ name: 'user' });
            if (role) {
               formData.roles = [role._id];
               const user = new User(formData);
               await user.save();

               return res.redirect('/users/login');
            }
         }
      } catch (error) {
         console.log(error);
         res.status(500).json({
            success: false,
            message: 'Internal server error',
         });
      }
   }

   // [POST] /users/login
   async signin(req, res, next) {
      try {
         const user = await User.findOne({
            username: req.body.username,
         }).populate('roles', '-__v');
         if (user) {
            let passwordIsValid = bcrypt.compareSync(
               req.body.password,
               user.password,
            );
            if (!passwordIsValid) {
               return res.status(404).send({
                  message: `password ban nhap khong dung`,
               });
            }
            var accessToken = jwt.sign(
               { userId: user._id },
               process.env.ACCESS_TOKEN_SECRET,
               {
                  expiresIn: 10, // 1 minute
               },
            );

            var authorities = [];

            for (let i = 0; i < user.roles.length; i++) {
               authorities.push('ROLE_' + user.roles[i].name.toUpperCase());
            }

            res.cookie('token', accessToken);

            res.redirect('/me');
         } else {
            return res.status(404).send({
               message: `khong tim duoc username co ten la ${req.body.username}`,
            });
         }
      } catch (error) {}
   }
}

module.exports = new UserController();
