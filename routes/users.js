var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');
const { sendOTPValidator, userRegisterValidator } = require('../validators/userValidator');
const { validate } = require('../middlewares/validationMiddleware');
const { verifyToken} = require('../middlewares/authMiddleware');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//Mobile OTP Send
router.post('/sent_otp', sendOTPValidator, validate, userController.sendOtp);

//OTP Verify
router.post('/verify_otp', userController.verifyOtp);

//User details
router.get('/details', verifyToken, userController.getUserDetails);

//Logout
router.post('/logout', verifyToken, userController.logout);

//Register User
router.post('/register', userRegisterValidator, validate, userController.registerUser);

module.exports = router;
