const { body } = require("express-validator");
const User = require("../models").User;


//Validator for sending OTP
exports.sendOTPValidator = [
    body('mobile_no').notEmpty().isLength({min: 10, max: 10}).withMessage('Mobile number must be 10 digits long')
];

//Validator for User Registration
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

//Validator for Follow / Unfollow User can be added here if needed
exports.followUnfollowValidator = [
    body('follow_user_id').notEmpty().withMessage('User ID to follow/unfollow is required')
    .custom(async (value, { req }) => {
        const userToFollow = await User.findOne({where: {id: value}});
        if (!userToFollow) {
            return Promise.reject('User to follow/unfollow does not exist');
        }
        if (userToFollow.id === req.user.id) {
            return Promise.reject('You cannot follow/unfollow yourself');
        }
        return true;
    })
];