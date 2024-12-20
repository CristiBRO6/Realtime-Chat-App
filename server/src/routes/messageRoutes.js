const express = require('express');
const router = express.Router();

const messageController = require('@/controllers/messageController');

const { requireAuth } = require('@/middleware/authMiddleware');

// USERS
router.get('/users', requireAuth(), messageController.getUsers);

// USER
router.get('/users:id', requireAuth(), messageController.getUser);

// GET GLOBAL MESSAGES
router.get('/', requireAuth(), messageController.getGlobalMessages);

// GET MESSAGES
router.get('/:id', requireAuth(), messageController.getMessages);

// SEND GLOBAL MESSAGE
router.post('/send', requireAuth(), messageController.sendGlobalMessage);

// SEND MESSAGE
router.post('/send/:id', requireAuth(), messageController.sendMessage);

module.exports = router;
