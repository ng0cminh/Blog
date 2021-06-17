const User = require('../models/User');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

class UserController {
   register(req, res, next) {
      res.render('users/register', {
         title: 'Đăng ký',
      });
   }

async createUser(req, res, next) {
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
            // Check for existing user
            const user = await User.findOne({ username });

            if (user) {
               return res
                  .status(400)
                  .json({ success: false, message: 'Username already taken' });
            } else {
               // All good
               const hashedPassword = await argon2.hash('password');
               formData.password = hashedPassword;
               const newUser = new User(formData);
               await newUser.save()

               // Return token
               const accessToken = jwt.sign({ userId: newUser._id }, process.env.ACCESS_TOKEN_SECRET);

               res.json({
                  
                  message: "luu duoc",
                  accessToken: accessToken
               })
               
            }
            
         } catch (error) {
            console.log('khong dang ky duoc thanh vien')
         }
      }
   }

   login(req, res, next) {
      res.render('users/login', {
         title: 'Đăng nhập',
      });
   }
}

module.exports = new UserController();
