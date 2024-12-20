const accountService = require('@/services/accountService');

// CHANGE AVATAR
exports.changeAvatar = async (req, res) => {
    try {
        const userId = req.user.id
        const avatar = req.file;

        const result = await accountService.changeAvatar(userId, avatar, req);
        return res.status(200).json(result);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ status: false, message: err.message });
    } 
};

// DELETE AVATAR
exports.deleteAvatar = async (req, res) => {
    try {
        const result = await accountService.deleteAvatar(req);
        return res.status(200).json(result);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ status: false, message: err.message });
    } 
};

// UPDATE PROFILE
exports.updateProfile = async (req, res) => {
    try {
        const id = req.user.id;
        const { name, phone } = req.body;

        const result = await accountService.updateProfile(id, name, phone);
        return res.status(200).json(result);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ status: false, message: err.message });
    } 
};

// CHANGE PASSWORD
exports.changePassword = async (req, res) => {
    try {
        const id = req.user.id;
        const { currentPassword, newPassword } = req.body;

        const result = await accountService.changePassword(id, currentPassword, newPassword);
        return res.status(200).json(result);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ status: false, message: err.message });
    }
};