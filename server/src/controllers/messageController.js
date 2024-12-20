const messageService = require('@/services/messageService');

exports.getUsers = async (req, res) => {
    try {
        const { id } = req.user;

        const result = await messageService.getUsers(id);
        return res.status(200).json(result);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ status: false, message: err.message });
    }
};

exports.getUser = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await messageService.getUser(id);
        return res.status(200).json(result);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ status: false, message: err.message });
    }
};

exports.getGlobalMessages = async (req, res) => {
    try {
        const result = await messageService.getGlobalMessages();
        return res.status(200).json(result);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ status: false, message: err.message });
    }
};

exports.getMessages = async (req, res) => {
    try {
        const { id: userChatId } = req.params;
        const { id: myId } = req.user;

        const result = await messageService.getMessages(myId, userChatId);
        return res.status(200).json(result);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ status: false, message: err.message });
    }
};

exports.sendGlobalMessage = async (req, res) => {
    try {
        const { text } = req.body;
        const { id } = req.user;

        const result = await messageService.sendGlobalMessage(id, text);
        return res.status(200).json(result);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ status: false, message: err.message });
    }
};


exports.sendMessage = async (req, res) => {
    try {
        const { text } = req.body;
        const { id: userChatId } = req.params;
        const { id: myId } = req.user;

        const result = await messageService.sendMessage(myId, userChatId, text);
        return res.status(200).json(result);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ status: false, message: err.message });
    }
};