var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//Mobile OTP Send
router.post('/sent_otp', userController.sendOtp);

//OTP Verify
router.post('/verify_otp', userController.verifyOtp);

module.exports = router;
