const { Op } = require('sequelize');
const { User, UserEmailVerification, UserResetPassword } = require('@/models');

exports.getProfile = async (req) => {
    try {
        return req.user;
    } catch (err) {
        console.error(err);
        throw new Error('Failed to get profile');
    }
};

exports.getUsers = async () => {
    try {
        return await User.findAll();
    } catch (err) {
        console.error(err);
        throw new Error('Failed to get users');
    }
};

exports.getUser = async (id) => {
    try {
        return await User.findOne({ where: { id } });
    } catch (err) {
        console.error(err);
        throw new Error('Failed to get user');
    }
};

exports.getEmailVerification = async (id) => {
    try {
        return await UserEmailVerification.findOne({ where: { id: id, used: false } });
    } catch (err) {
        console.error(err);
        throw new Error('Failed to get email verification');
    }
};

exports.getResetPassword = async (id) => {
    try {
        return await UserResetPassword.findOne({
            where: {
                id: id,
                used: false,
                [Op.or]: [
                    { expire: -1 },
                    { expire: { [Op.gt]: Date.now() } }
                ]
            }
        });
    } catch (err) {
        console.error(err);
        throw new Error('Failed to get reset password');
    }
};