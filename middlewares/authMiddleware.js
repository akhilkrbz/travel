const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Expect: "Bearer <token>"

    if(!token) {
        res.status(401).json({
            message: 'Access token is missing'
        });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            res.status(403).json({
                message: 'Invalid or Expired access token'
            });
        }

        req.user = user;
        next();
    });
};