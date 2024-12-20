const jwt = require('jsonwebtoken');

const createAccessToken = (userId) => {
    return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.EXPIRE_ACCESS_TOKEN_SECRET
    });
};

const createRefreshToken = (userId) => {
    return jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: process.env.EXPIRE_REFRESH_TOKEN_SECRET
    });
};

const verifyToken = (token, secret) => {
    try {
        return jwt.verify(token, secret);
    } catch (err) {
        return null;
    }
};

module.exports = { createAccessToken, createRefreshToken, verifyToken };