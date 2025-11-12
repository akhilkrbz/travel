const User = require('../models').User;
const jwt = require('jsonwebtoken');

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
                const token = jwt.sign({
                    id          : check_user.id,
                    mobile_no   : check_user.mobile_no,
                    email       : check_user.email,
                    name        : check_user.name
                },
                process.env.JWT_SECRET, { expiresIn: '1h' });

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
            message: 'Error sending OTP.'
        });
    }

    
}


//Get user details
function getUserDetails (req, res) {
    try {
        res.status(200).json({
            user: req.user
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error getiing user details.'
        });
    }
}


module.exports = { sendOtp, verifyOtp, getUserDetails };