const jwt = require('jsonwebtoken');
const User = require('../models/User');

const verifyToken = async (req, res, next) => {
   var token = req.cookies.token;

   if (!token) {
      return res.redirect('/users/login');
   }

   try {
      const decoded = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      if (decoded) {
         req.userId = decoded.userId;

         next();
         return;
      } else {
         res.redirect('/users/login');
      }
   } catch (error) {
      console.log(error);
      return res.status(403).json({
         success: false,
         message: 'Invalid token',
      });
   }
};

module.exports = verifyToken;
