const userService = require('@/services/userService');

exports.getProfile = async (req, res) => {
    try {
        const profile = await userService.getProfile(req);
        return res.status(200).json(profile);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ status: false, message: err.message });
    }
};

exports.getUsers = async (req, res) => {
    try {
        const users = await userService.getUsers();
        return res.status(200).json(users);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ status: false, message: err.message });
    }
};

exports.getUser = async (req, res) => {
    const id = req.params.id;

    try {
        const user = await userService.getUser(id);
        return res.status(200).json(user);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ status: false, message: err.message });
    }
};

exports.getEmailVerification = async (req, res) => {
    const id = req.params.id;

    try {
        const emailVerification = await userService.getEmailVerification(id);
        return res.status(200).json(emailVerification);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ status: false, message: err.message });
    }
};

exports.getResetPassword = async (req, res) => {
    const id = req.params.id;

    try {
        const resetPassword = await userService.getResetPassword(id);
        return res.status(200).json(resetPassword);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ status: false, message: err.message });
    }
};