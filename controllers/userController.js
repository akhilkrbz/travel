const User = require('../models').User;

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
                return res.status(200).json({
                    message: "User does not exist. Please register.",
                    mobile_no: mobile_no
                });
            } else {
                console.log("User already exist.");
            }

            res.status(200).json({
                message: "OTP Verified successfully."
            });
        } else {
            res.status(400).json({
                message: "Invalid OTP."
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error sending OTP'
        });
    }

    
}


module.exports = { sendOtp, verifyOtp };