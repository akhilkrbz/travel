const { body } = require("express-validator");
const User = require("../models").User;

exports.sendOTPValidator = [
    body('mobile_no').notEmpty().isLength({min: 10, max: 10}).withMessage('Mobile number must be 10 digits long')
];

exports.userRegisterValidator = [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Valid email is required')
    .custom(async (value) => {
        const existingUser = await User.findOne({where: {email: value}});
        if (existingUser) {
            return Promise.reject('E-mail already in use');
        }
        return true;
    }),
    body('mobile_no').notEmpty().withMessage('Mobile No. is required')
    .isLength({min: 10, max: 10}).withMessage('Mobile number must be 10 digits long')
    .custom(async (value) => {
        const existingUser = await User.findOne({where: {mobile_no: value}});
        if (existingUser) {
            return Promise.reject('Mobile No. already in use');
        }
        return true;
    }),
    body('username').notEmpty().withMessage('Username is required'),
];