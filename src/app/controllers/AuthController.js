const User = require('../models/User');
const argon2 = require('argon2');

class AuthController {
   async register(req, res, next) {
      const { username, password } = req.body;

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
                const newUser = new User({ username, password: hashedPassword });
                await newUser.save()
 
                // Return token
                const accessToken = jwt.sign({ userId: newUser._id }, process.env.ACCESS_TOKEN_SECRETACCESS_TOKEN_SECRET);

                res.json({
                    message: "luu duoc"
                })
                
            }
            
         } catch (error) {

         }
      }
   }
}

module.exports = new AuthController();
