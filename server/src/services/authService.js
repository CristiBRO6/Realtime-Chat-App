const { User, UserEmailVerification, UserResetPassword, sequelize } = require('@/models');
const { Op } = require('sequelize');
const bcrypt = require("bcrypt");

const eventEmitter = require('@/events/email');

const { authenticateUser } = require("@/utils/authUtils");

const generateCode = (min, max) => Math.floor(Math.random() * (max - min) + min);

exports.register = async (name, email, password) => {
    try {
        return await sequelize.transaction(async (transaction) => {
            const hashedPassword = await bcrypt.hash(password, 10);

            const user = await User.create(
                {
                    name: name,
                    email: email,
                    password: hashedPassword
                },
                { transaction }
            );

            const userId = user.id;
            const code = generateCode(100000, 1000000);

            const userEmailVerification = await UserEmailVerification.create({ userId, code }, { transaction });

            await new Promise((resolve, reject) => {
                eventEmitter.emit('welcome', { name, email, resolve, reject });
                eventEmitter.emit('sendVerificationCode', { email, code, id: userEmailVerification.id, resolve, reject });
            });

            return { status: true, message: 'User successfully registered', redirect: '/auth/email-verification/' + userEmailVerification.id };
        });
    } catch (err) {
        console.error(err);
        throw new Error('Failed to register');
    }
};

exports.login = async (email, password, res) => {
    try {
        const user = await User.findOne({ where: { email } });

        if (!user) return { status: false, message: 'Email or password do not match' };
        if(!await bcrypt.compare(password, user.password)) return { status: false, message: 'Email or password do not match' };

        const userId = user.id;

        if(!user.verified){
            let userEmailVerification = await UserEmailVerification.findOne({ where: { userId, used: false, } });

            if(!userEmailVerification) {
                const code = generateCode(100000, 1000000);

                userEmailVerification = await UserEmailVerification.create({ userId, code });

                await new Promise((resolve, reject) => {
                    eventEmitter.emit('sendVerificationCode', { email, code, id: userEmailVerification.id, resolve, reject });
                });
            }

            return { status: false, message: 'needEmailVerification', redirect: '/auth/email-verification/' + userEmailVerification.id };
        }

        authenticateUser(res, userId);

        return { status: true, message: 'User successfully logged', redirect: '/' };
    } catch (err) {
        console.error(err);
        throw new Error('Failed to login');
    }
};

exports.emailVerification = async (id, code, res) => {
    try {
        return await sequelize.transaction(async (transaction) => {
            const userEmailVerification = await UserEmailVerification.findOne({
                where: {
                    id: id,
                    code: code,
                    used: false,
                    [Op.or]: [
                        { expire: -1 },
                        { expire: { [Op.gt]: Date.now() } }
                    ]
                },
                transaction
            });

            if(!userEmailVerification) return { status: false, message: "The code is incorrect" };

            const userId = userEmailVerification.userId;

            await UserEmailVerification.update(
                { used: true },
                { where: { userId, code }, transaction }
            );

            await User.update(
                { verified: true },
                { where: { id: userId }, transaction }
            );

            authenticateUser(res, userId);
        
            return { status: true, message: "verificationSuccessful", redirect: "/" };
        });
    } catch (err) {
        console.error(err);
        throw new Error('Failed to verify email');
    }
};

exports.resendCode = async (id) => {
    try {
        return await sequelize.transaction(async (transaction) => {
            const userEmailVerification = await UserEmailVerification.findOne({
                where: {
                    id: id,
                    used: false,
                    [Op.or]: [
                        { expire: -1 },
                        { expire: { [Op.gt]: Date.now() } }
                    ]
                },
                transaction
            });

            if (!userEmailVerification) return { status: false, message: "Something went wrong, please refresh" };

            const user = await User.findOne({ where: { id: userEmailVerification.userId }, transaction });

            const recentRequest = await UserEmailVerification.findOne({
                where: {
                    userId: user.id,
                    used: false,
                    [Op.or]: [
                        { expire: -1 },
                        { expire: { [Op.gt]: Date.now() } }
                    ]
                },
                order: [['updatedAt', 'DESC']]
            });

            const now = Date.now();
            const cooldownTime = 3 * 60 * 1000;

            if (recentRequest) {
                const timeElapsed = now - recentRequest.updatedAt.getTime();
                if (timeElapsed < cooldownTime) {
                    const timeRemaining = cooldownTime - timeElapsed;
                    const minutes = Math.floor(timeRemaining / (1000 * 60));
                    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
                    const formattedTimeRemaining = minutes > 0 ? `${minutes} minute${minutes > 1 ? 's' : ''}` : `${seconds} second${seconds > 1 ? 's' : ''}`;
                    return { status: false, message: `Please wait for another ${formattedTimeRemaining} before requesting again` };
                }
            }

            const code = generateCode(100000, 1000000);

            await new Promise((resolve, reject) => {
                eventEmitter.emit('sendVerificationCode', { email: user.email, code, id: userEmailVerification.id, resolve, reject });
            });

            await UserEmailVerification.update(
                { code },
                { where: { id }, transaction }
            );

            return { status: true, message: "Verification code sent successfully. Please check your email" };
        });
    } catch (err) {
        console.error(err);
        throw new Error('Failed to resend code');
    }
};

exports.forgotPassword = async (email) => {
    try {
        return await sequelize.transaction(async (transaction) => {
            const user = await User.findOne({ where: { email }, transaction });

            if (user) {
                const userId = user.id;

                const recentRequest = await UserResetPassword.findOne({ 
                    where: { userId },
                    order: [['createdAt', 'DESC']],
                    transaction
                });

                const now = Date.now();
                const cooldownTime = 3 * 60 * 1000;

                if (recentRequest) {
                    const timeElapsed = now - recentRequest.createdAt.getTime();
                    if (timeElapsed < cooldownTime) {
                        const timeRemaining = cooldownTime - timeElapsed;
                        const minutes = Math.floor(timeRemaining / (1000 * 60));
                        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
                        const formattedTimeRemaining = minutes > 0 
                            ? `${minutes} minute${minutes > 1 ? 's' : ''}` 
                            : `${seconds} second${seconds > 1 ? 's' : ''}`;
                        return { status: false, message: `Please wait for another ${formattedTimeRemaining} before trying again` };
                    }
                }

                const expire = now + 10 * 60 * 1000; // 10 MIN

                await UserResetPassword.destroy({ where: { userId, used: false }, transaction });

                const passwordReset = await UserResetPassword.create({ userId, expire }, { transaction });

                await new Promise((resolve, reject) => {
                    eventEmitter.emit('resetPassword', { email, id: passwordReset.id, resolve, reject });
                });
            }

            return { status: true, message: "An email with a password recovery link has been sent to your inbox" };
        });
    } catch (err) {
        console.error(err);
        throw new Error('Failed to process the password recovery request');
    }
};

exports.resetPassword = async (id, password, res) => {
    try {
        return await sequelize.transaction(async (transaction) => {
            const passwordReset = await UserResetPassword.findOne({
                where: {
                    id: id,
                    used: false,
                    [Op.or]: [
                        { expire: -1 },
                        { expire: { [Op.gt]: Date.now() } }
                    ]
                },
                transaction
            });

            if (!passwordReset) return { status: false, message: "The reset request has either expired or has already been used" };

            const userId = passwordReset.userId;
            const hashedPassword = await bcrypt.hash(password, 10);

            await UserResetPassword.update(
                { used: true },
                { where: { userId }, transaction }
            );

            await User.update(
                { password: hashedPassword },
                { where: { id: userId }, transaction }
            );

            authenticateUser(res, userId);

            return { status: true, message: "Your password has been reset successfully", redirect: '/' };
        });
    } catch (err) {
        console.error(err);
        throw new Error('Failed to reset the password');
    }
};

exports.logout = (req, res) => {
    try {
        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');

        return { status: true, message: "You have logged out successfully", redirect: "/auth/login" };
    } catch (err) {
        console.error(err);
        return reject(new Error("Failed to logout"));
    }
};