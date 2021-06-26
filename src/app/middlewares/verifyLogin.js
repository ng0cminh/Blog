const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Role = require('../models/Role');

module.exports = async function verifyLogin(req, res, next) {
   const token = req.cookies.token;
   try {
      if (!token) {
         req.userId = null;
         next();
         return;
      } else {
         const decoded = await jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET,
         );
         if (decoded) {
            req.userId = decoded.userId;
            const user = await User.findById(req.userId);
            if (user) {
               const roles = await Role.find({ _id: { $in: user.roles } });
               if(roles) {
                  req.roles = roles.map(role => {
                     return role.name
                  });
               }
            }
         } else {
            req.userId = null;
         }
         next();
         return;
      }
   } catch (error) {
      console.log(error);
      return res.status(403).json({
         success: false,
         message: 'Invalid token',
      });
   }
};
