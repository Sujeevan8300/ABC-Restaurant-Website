// utils/authUtils.js
const jwt = require('jsonwebtoken');

// Token authentication middleware
const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ msg: 'No token provided' });
    }

    jwt.verify(token, 'your_jwt_secret', (err, decoded) => {
        if (err) {
            return res.status(403).json({ msg: 'Invalid token' });
        }

        req.user = decoded;
        next();
    });
};

// Role check middleware to verify if the user is an admin
const checkAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ msg: 'Access denied. Admins only.' });
    }
    next();
};

module.exports = { authenticateToken, checkAdmin };
