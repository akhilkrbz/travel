
//SEND OTP to Mobile Number
exports.sendOtp = function(req, res) {
    const { mobile_no } = req.body;

    res.status(200).json({
        message: 'OTP sent successfully to ' + mobile_no
    });
}

//Verify OTP
exports.verifyOtp = function (req, res) {
    const { mobile_no, otp } = req.body;

    if(otp == '1234') {
        res.status(200).json({
            message: "OTP Verified successfully."
        });
    } else {
        res.status(400).json({
            message: "Invalid OTP."
        });
    }
}