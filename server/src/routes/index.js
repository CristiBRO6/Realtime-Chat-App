const express = require('express');
const router = express.Router();

// AUTH
router.use('/auth', require('@/routes/authRoutes'));

// USERS
router.use('/users', require('@/routes/userRoutes'));

// ACCOUNTS
router.use('/account', require('@/routes/accountRoutes'));

// MESSAGES
router.use('/message', require('@/routes/messageRoutes'));

// IMAGES
router.use('/images', require('@/routes/imageRoutes'));

module.exports = router;