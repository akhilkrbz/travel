//Create JWT Token
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

function createJWT(user) {
    const payload = {
        id: user.id,
        mobile_no: user.mobile_no,
        name: user.name,
        email: user.email
    };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
    return token;
}

module.exports = { createJWT };