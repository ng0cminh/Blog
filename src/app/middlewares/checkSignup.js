const User = require('../models/User');

const ROLES = ['user', 'moderator', 'admin'];

async function checkSignup(req, res, next) {
   try {
      const user = await User.findOne({ username: req.body.username });
      if (user) {
         res.status(400).json({
            message: 'username da ton tai',
         });
         return;
      }

      const email = await User.findOne({ email: req.body.email });
      if (email) {
         res.status(400).json({
            message: 'email da ton tai',
         });
         return;
      }

      //  Check password
      if (req.body.password !== req.body.confirmPassword) {
         res.status(400).json({
            message: 'Password va password nhap lai khong giong nhau',
         });
         return;
      }

      if (req.body.roles) {
         for (let i = 0; i < req.body.roles.length; i++) {
            if (!ROLES.includes(req.body.roles[i])) {
               res.status(400).json({
                  message: `ROLE khong ton tai`,
               });
               return;
            }
         }
      }

      next();
   } catch (error) {
      res.status(500).json({
         message: error,
      });
   }
}

module.exports = checkSignup;
