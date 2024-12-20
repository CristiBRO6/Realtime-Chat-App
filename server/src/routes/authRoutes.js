const express = require('express');
const router = express.Router();

const authController = require('@/controllers/authController');

const { requireAuth, requireGuest } = require('@/middleware/authMiddleware');
const validate = require('@/middleware/validate');

const { registerValidation, loginValidation, emailVerificationValidation, forgotPasswordValidation, resetPasswordValidation } = require("@/validations/authValidation");

// REGISTER
router.post('/register', requireGuest(), validate(registerValidation), authController.register);

// LOGIN
router.post('/login', requireGuest(), validate(loginValidation), authController.login);

// EMAIL VERIFICATION
router.post('/email-verification', requireGuest(), validate(emailVerificationValidation), authController.emailVerification);

// RESEND CODE
router.post('/resend-code', requireGuest(), authController.resendCode);

// FORGOT PASSWORD
router.post('/forgot-password', requireGuest(), validate(forgotPasswordValidation), authController.forgotPassword);

// RESET PASSWORD
router.post('/reset-password', requireGuest(), validate(resetPasswordValidation), authController.resetPassword);

// LOGOUT
router.get('/logout', requireAuth(), authController.logout);

module.exports = router;