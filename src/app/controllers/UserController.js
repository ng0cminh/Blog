const User = require('../models/User');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

class UserController {
   register(req, res, next) {
      res.render('users/register', {
         title: 'Đăng ký',
      });
   }

   // [POST] /register
   async createUser(req, res, next) {
      const formData = req.body;
      const { username, password, email } = formData;

      // Simple validation
      if (!username || !password || !email) {
         return res.status(400).json({
            success: false,
            message: 'Missing username and/or password and/or email',
         });
      } else {
         try {
            // Check for existing user
            const user = await User.findOne({ username });
            if (user) {
               return res
                  .status(400)
                  .json({ success: false, message: 'Username already taken' });
            }

            // Check for existing email
            const emailvalid = await User.findOne({ email });
            if (emailvalid) {
               return res
                  .status(400)
                  .json({ success: false, message: 'Email already taken' });
            }

            // All good
            const hashedPassword = await argon2.hash(password);
            formData.password = hashedPassword;
            const newUser = new User(formData);
            await newUser.save();

            // Return token
            const accessToken = jwt.sign(
               { userId: newUser._id },
               process.env.ACCESS_TOKEN_SECRET,
            );

            res.json({
               message: 'luu duoc',
               accessToken: accessToken,
            });
         } catch (error) {
            console.log(error);
            res.status(500).json({
               success: false,
               message: 'Internal server error',
            });
         }
      }
   }

   login(req, res, next) {
      res.render('users/login', {
         title: 'Đăng nhập',
      });
   }

   async loginValidate(req, res, next) {
      const formData = req.body;
      const { username, password } = formData;
      // Simple validation
      if (!username || !password) {
         return res.status(400).json({
            success: false,
            message: 'Missing username and/or password',
         });
      } else {
         try {
            // Check for exitsting user
            const user = await User.findOne({ username });

            if (!user) {
               return res.status(400).json({
                  success: false,
                  message: 'Incorrect username',
               });
            }

            // Username found
            const passwordValid = await argon2.verify(user.password, password);

            if (!passwordValid) {
               return res.status(400).json({
                  success: false,
                  message: 'Incorrect password',
               });
            }

            // All good
            // Return token
            const accessToken = jwt.sign(
               { userId: user._id },
               process.env.ACCESS_TOKEN_SECRET,
            );

            res.json({
               message: 'dang nhap thanh cong',
               accessToken: accessToken,
            });
         } catch (error) {
            console.log(error);
            res.status(500).json({
               success: false,
               message: 'Internal server error',
            });
         }
      }
   }
}

module.exports = new UserController();
