const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Role = require('../models/Role');

class Authorization {
   async isUser(req, res, next) {
      try {
         const user = await User.findById(req.userId);
         if (user) {
            const roles = await Role.find({ _id: { $in: user.roles } });
            for (let i = 0; i < roles.length; i++) {
               if (roles[i].name === 'user') {
                  next();
                  return;
               }
            }
         }
         res.redirect('/users/login');
         return;
      } catch (error) {
         res.status(500).send({
            message: err,
         });
         return;
      }
   }

   async isModerator(req, res, next) {
      try {
         const moderator = await User.findById(req.userId);
         if (moderator) {
            const roles = await Role.find({ _id: { $in: moderator.roles } });
            for (let i = 0; i < roles.length; i++) {
               if (roles[i].name === 'moderator') {
                  next();
                  return;
               }
            }
         }
         res.status(403).json({
            message: 'khong co quyen',
         });
      } catch (error) {
         res.status(500).send({
            message: err,
         });
         return;
      }
   }

   async isAdmin(req, res, next) {
      try {
         const admin = await User.findById(req.userId);
         if (admin) {
            const roles = await Role.find({ _id: { $in: admin.roles } });
            for (let i = 0; i < roles.length; i++) {
               if (roles[i].name === 'admin') {
                  next();
                  return;
               }
            }
         }
         res.status(403).json({
            message: 'khong co quyen',
         });
      } catch (error) {
         res.status(500).send({
            message: err,
         });
         return;
      }
   }
}

module.exports = new Authorization();
