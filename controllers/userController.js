const User = require('../models').User;
const UserFollow = require('../models').UserFollow;
const jwt = require('jsonwebtoken');
const userHelper = require('../helpers/userHelper');

//SEND OTP to Mobile Number
function sendOtp (req, res) {
    try {

        const { mobile_no } = req.body;

        res.status(200).json({
            message: 'OTP sent successfully to ' + mobile_no
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error sending OTP'
        });
    }
    
}

//Verify OTP
async function verifyOtp (req, res) {

    try {
        const { mobile_no, otp } = req.body;

        if(otp == '1234') {

            //Check user existence in DB
            const check_user = await User.findOne({where: {mobile_no: mobile_no}});
            console.log("check_user", check_user);

            if(!check_user) {
                res.status(200).json({
                    message: "OTP Verified successfully. Please register.",
                    mobile_no: mobile_no
                });
            } else {
                console.log("User already exist.");

                //Create JWT Token
                const token = await userHelper.createJWT(check_user);

                res.status(200).json({
                    message: "OTP Verified successfully.",
                    token: token    
                });
            }
        } else {
            res.status(400).json({
                message: "Invalid OTP."
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error in OTP verification.'
        });
    }

    
}


//Get user details
async function getUserDetails (req, res) {
    try {
        const user_id = req.user.id;
        const user_details = await User.findByPk(user_id);
        if(!user_details) {
            return res.status(404).json({
                message: 'User not found.'
            });
        } else {
            res.status(200).json({
                user: user_details
            });
        }
        
    } catch (error) {
        res.status(500).json({
            message: 'Error getiing user details.'
        });
    }
}

//logout
function logout (req, res) {
    try {
        // Invalidate token logic can be implemented here if token blacklisting is used
        res.status(200).json({
            message: 'User logged out successfully.'
        });
        
    } catch (error) {
        res.status(500).json({
            message: 'Error with logout user.'
        });
    }
}


//registerUser
async function registerUser (req, res) {
    try {

        const user_data = {
            name: req.body.name,
            email: req.body.email,
            mobile_no: req.body.mobile_no,
            login_id: req.body.username,
            verified_account: 0,
            createdAt: new Date(),
            updatedAt: new Date()
        }

        console.log("user_data", user_data);
        

        const create_user = await User.create(user_data);
        console.log("create_user", create_user);
        
        if(!create_user) {
            return res.status(400).json({
                message: 'Error creating user.'
            });
        } else {

            //Create JWT Token
            const token = await userHelper.createJWT(create_user);

            res.status(200).json({
                message: "User registered successfully.",
                token: token    
            });

        }
        
    } catch (error) {
        res.status(500).json({
            message: 'Error with user register.'
        });
    }
}


//Follow / Unfollow User
async function followUnfollowUser (req, res) {
    try {
        const user_id = req.user.id;
        const { follow_user_id } = req.body;
        console.log("user_id", user_id);
        console.log("follow_user_id", follow_user_id);

        const check_user_follow = await UserFollow.findOne({where: {user_id: user_id, follow_user_id: follow_user_id}});
        console.log("check_user_follow", check_user_follow);
        
        if(check_user_follow) {
            await UserFollow.destroy({where: {user_id: user_id, follow_user_id: follow_user_id}});
            var result = {message: 'User unfollowed successfully.'};
        } else {
            await UserFollow.create({
                user_id: user_id,
                follow_user_id: follow_user_id,
                createdAt: new Date(),
                updatedAt: new Date()
            });
            var result = {message: 'User followed successfully.'};
        }

        res.status(200).json({
            message: result.message
        });
    }
    catch (error) {
        console.error('Follow/Unfollow Error:', error);
        res.status(500).json({
            message: 'Error in follow/unfollow user.',
            error: error.message
        });
    }
}

module.exports = { 
    sendOtp, 
    verifyOtp, 
    getUserDetails, 
    logout, 
    registerUser, 
    followUnfollowUser 
};