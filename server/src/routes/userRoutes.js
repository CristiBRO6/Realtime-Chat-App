const express = require('express');
const router = express.Router();

const userControllers = require('@/controllers/userControllers');

// GET PROFILE
router.get('/profile', userControllers.getProfile);

// USERS
router.get('/users', userControllers.getUsers);
router.get('/users/:id', userControllers.getUser);

// VERIFY EMAIL VERIFICATION
router.get('/emailVerification/:id', userControllers.getEmailVerification);

// VERIFY RESET PASSWORD
router.get('/resetPassword/:id', userControllers.getResetPassword);

module.exports = router;