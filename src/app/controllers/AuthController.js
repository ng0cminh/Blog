const User = require('../models/User');
const Role = require('../models/Role');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

class AuthController {
   // [GET] /users/login
   login(req, res, next) {
      res.render('users/login', {
         title: 'Đăng nhập',
      });
   }

   // [GET] /users/register
   register(req, res, next) {
      res.render('users/register', {
         title: 'Đăng ký',
      });
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
               res.json({
                  success: true,
                  message: user,
               });
            }
         } else {
            const role = await Role.findOne({ name: 'user' });
            if (role) {
               formData.roles = [role._id];
               const user = new User(formData);
               await user.save();

               res.json({
                  success: true,
                  message: user,
               });
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
            var token = jwt.sign(
               { id: user.id },
               process.env.ACCESS_TOKEN_SECRET,
               {
                  expiresIn: 86400, // 24 hours
               },
            );

            var authorities = [];

            for (let i = 0; i < user.roles.length; i++) {
               authorities.push('ROLE_' + user.roles[i].name.toUpperCase());
            }
            res.status(200).send({
               id: user._id,
               username: user.username,
               email: user.email,
               roles: authorities,
               accessToken: token,
            });
         } else {
            return res.status(404).send({
               message: `khong tim duoc username co ten la ${req.body.username}`,
            });
         }
      } catch (error) {}
   }
}

module.exports = new AuthController();
