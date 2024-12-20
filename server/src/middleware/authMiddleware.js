const { User } = require('@/models');

const { ACCESS_TOKEN_MAX_AGE } = require('@/lib/constants');
const { createAccessToken, verifyToken } = require('@/utils/jwtUtils');
const { setCookie } = require("@/utils/authUtils");

const requireAuth = () => (req, res, next) => {
    if (req.user) return next();
    return res.status(401).json({ status: false, message: "Please log in" });
};

const requireGuest = () => (req, res, next) => {
    if (req.user) return res.status(403).json({ status: false, message: "You are already logged in" });
    return next()
};

const checkUser = async (req, res, next) => {
    const { accessToken, refreshToken } = req.cookies;

    req.user = null;

    if (!accessToken && !refreshToken) return next();

    if(!refreshToken || !verifyToken(refreshToken, process.env.REFRESH_TOKEN_SECRET)){
        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');
        return next();
    }

    if (!accessToken || !verifyToken(accessToken, process.env.ACCESS_TOKEN_SECRET)) {
        try {
            const decoded = verifyToken(refreshToken, process.env.REFRESH_TOKEN_SECRET);
            const userId = decoded.userId;

            const newAccessToken = createAccessToken(userId);
            setCookie(res, 'accessToken', newAccessToken, ACCESS_TOKEN_MAX_AGE);

            req.cookies.accessToken = newAccessToken;
        } catch (err) {
            res.clearCookie('accessToken');
            res.clearCookie('refreshToken');
            return next();
        }
    }

    const token = req.cookies.accessToken;

    if (!token) return next();

    try {
        const decoded = verifyToken(token, process.env.ACCESS_TOKEN_SECRET);
        const userId = decoded.userId;

        const user = await User.findOne({ where: { id: userId } });

        if (!user || !user.verified) {
            res.clearCookie('accessToken');
            res.clearCookie('refreshToken');
            return next();
        }

        req.user = user;
    } catch (err) {
        console.error(err);
        
        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');
        return next();
    }

    return next();
};

module.exports = { requireAuth, requireGuest, checkUser };
