const { ACCESS_TOKEN_MAX_AGE, REFRESH_TOKEN_MAX_AGE } = require('@/lib/constants');
const { app } = require('@/lib/socket');
const { createAccessToken, createRefreshToken } = require('@/utils/jwtUtils');

const authenticateUser = (res, userId) => {
    const accessToken = createAccessToken(userId);
    const refreshToken = createRefreshToken(userId);

    setCookie(res, 'accessToken', accessToken, ACCESS_TOKEN_MAX_AGE);
    setCookie(res, 'refreshToken', refreshToken, REFRESH_TOKEN_MAX_AGE);
};

const setCookie = (res, name, value, maxAge) => {
    res.cookie(name, value, {
        maxAge: maxAge * 1000, 
        httpOnly: true,
        sameSite: 'None',
        secure: (app.get('env') === 'production'),
    });
};

module.exports = { authenticateUser, setCookie };
