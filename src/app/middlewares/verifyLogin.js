const jwt = require('jsonwebtoken');

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
