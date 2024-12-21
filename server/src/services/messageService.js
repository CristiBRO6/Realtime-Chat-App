const { getReceiverSocketId, io } = require('@/lib/socket');
const { User, Message } = require('@/models');
const { Op } = require('sequelize');

exports.getUsers = async (id) => {
    try {
        return await User.findAll({ where: { id: { [Op.not]: id } } });
    } catch (err) {
        console.error(err);
        throw new Error('Failed to get users');
    }
};

exports.getGlobalMessages = async () => {
    try {
        return await Message.findAll({
            where: { isGlobal: true },
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'name', 'email', 'avatar'],
                },
            ],
            order: [['createdAt', 'ASC']],
        });
    } catch (err) {
        console.error(err);
        throw new Error('Failed to get global messages');
    }
};

exports.getMessages = async (myId, userChatId) => {
    try {
        return await Message.findAll({
            where: {
                [Op.or]: [
                    { senderId: myId, receiverId: userChatId },
                    { senderId: userChatId, receiverId: myId }
                ]
            },
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'name', 'email', 'avatar'],
                },
            ],
            order: [['createdAt', 'ASC']]
        });
    } catch (err) {
        console.error(err);
        throw new Error('Failed to get messages');
    }
};

exports.sendGlobalMessage = async (id, text) => {
    try {
        const { id: messageId } = await Message.create({
            senderId: id,
            text: text,
            isGlobal: true
        });

        const message = await Message.findOne({
            where: { id: messageId },
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'name', 'email', 'avatar'],
                },
            ],
        });

        io.to("globalChat").emit("newGlobalMessage", message);

        return message;
    } catch (err) {
        console.error(err);
        throw new Error('Failed to send message');
    }
};

exports.sendMessage = async (myId, userChatId, text) => {
    try {
        const { id: messageId } =  await Message.create({
            senderId: myId,
            receiverId: userChatId,
            text: text
        });

        const message = await Message.findOne({
            where: { id: messageId },
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'name', 'email', 'avatar'],
                },
            ],
        });

        const receiverSocketId = getReceiverSocketId(userChatId);

        if(receiverSocketId) io.to(receiverSocketId).emit("newMessage", message);

        return message;
    } catch (err) {
        console.error(err);
        throw new Error('Failed to send message');
    }
};