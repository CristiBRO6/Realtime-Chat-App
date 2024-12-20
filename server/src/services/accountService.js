const { User, UserImage, sequelize } = require('@/models');
const bcrypt = require("bcrypt");

const { fileToBase64, calculateHash } = require('@/utils/fileUtils');

exports.changeAvatar = async (userId, avatar, req) => {
    try {
        return await sequelize.transaction(async (transaction) => {
            const data = fileToBase64(avatar);
            const hash = calculateHash(avatar);

            await UserImage.destroy({ where: { userId }, transaction });

            await UserImage.create(
                {
                    userId: userId,
                    data: data,
                    contentType: avatar.mimetype,
                    hash: hash,
                },
                { transaction }
            );

            const imageUrl = `${req.protocol}://${req.get('host')}/api/images/avatar/${userId}?hash=${hash}`;

            await User.update(
                { avatar: imageUrl },
                { where: { id: userId }, transaction }
            );

            return { status: true, imageUrl: imageUrl, message: 'Avatar uploaded successfully' };
        });
    } catch (err) {
        console.error(err);
        throw new Error('Failed to upload the avatar');
    }
};

exports.deleteAvatar = async (req) => {
    try {
        const { id: userId } = req.user;

        await User.update(
            { avatar: '' },
            { where: { id: userId } }
        );
        
        return { status: true, message: 'Avatar deleted successfully' };
    } catch (err) {
        console.error(err);
        throw new Error('Failed to delete the avatar');
    }
};

exports.updateProfile = async (id, name, phone) => {
    try {
        await User.update(
            { name, phone },
            { where: { id } }
        );
    
        return { status: true, message: "Profile updated successfully" };
    } catch (err) {
        console.error(err);
        throw new Error('Failed to update profile');
    } 
};

exports.changePassword = async (id, currentPassword, newPassword) => {
    try {
        const user = await User.findOne({ where: { id } });
        if(!await bcrypt.compare(currentPassword, user.password)) return { status: false, path: "currentPassword", message: 'Current password do not match'};

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await User.update(
            { password: hashedPassword },
            { where: { id } }
        );

        return { status: true, message: "Password changed successfully" };
    } catch (err) {
        console.error(err);
        throw new Error('Failed to change password');
    }
};