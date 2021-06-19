const express = require('express');
const argon2 = require('argon2')
const router = express.Router();

const authController = require('../app/controllers/BlogController');

//@route POST api/auth/register
//@desc Register user
//@access Public

router.post('/register', async(req, res) => {
    const {username, password} = req.body;

    // Simple validation
    if(!username || !password) {
        return res.status(400).json({success: false, message: 'Missing username and/or password'})
    } else {
        try {
            // Check for existing user
            const user = await User.findOne({username})

            if(user) {
                return res.status(400).json({success: false, message: 'Username already taken'})

                // All good
                const hashedPassword = await argon2.hash("password");
                const newUser = new User({username, password: hashedPassword})
                await newUser.save()

                // Return token
                const accessToken = jwt.sign({userId: newUser._id},)
            }
        } catch (error) {
            
        }
    }
})
