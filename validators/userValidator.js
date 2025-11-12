const { body } = require("express-validator");

exports.sendOTPValidator = [
    body('mobile_no').notEmpty().isLength({min: 10, max: 10}).withMessage('Mobile number must be 10 digits long')
];