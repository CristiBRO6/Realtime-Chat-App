const { body } = require('express-validator');
const { User } = require('@/models');

// REGISTER
const registerValidation = [
    body('name')
        .trim()
        .notEmpty().withMessage('Name is required'),
    body('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email format')
        .custom(async (value) => {
            const user = await User.findOne({ where: { email: value } });
            if (user) throw new Error('Email address is already taken');
            return true;
        }),
    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
        .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
        .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter')
        .matches(/[0-9]/).withMessage('Password must contain at least one number')
        .matches(/[!@#$%^&*_-]/).withMessage('Password must contain at least one special character: !@#$%^&*_'),
    body('confirmPassword')
        .notEmpty().withMessage('Confirm Password is required')
        .custom((value, { req }) => {
            if (value !== req.body.password) throw new Error("Passwords don't match");
            return true;
        }),
];

// LOGIN
const loginValidation = [
    body('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email format'),
    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
        .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
        .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter')
        .matches(/[0-9]/).withMessage('Password must contain at least one number')
        .matches(/[!@#$%^&*_-]/).withMessage('Password must contain at least one special character: !@#$%^&*_-'),
];

// EMAIL VERIFICATION
const emailVerificationValidation = [
    body('code')
      .isInt({ min: 100000, max: 999999 }).withMessage('The code must have exactly 6 digits')
      .custom(value => value.toString().length === 6).withMessage('The code must have exactly 6 digits'),
];

// FORGOT PASSWORD
const forgotPasswordValidation = [
    body('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email format'),
];

// RESET PASSWORD
const resetPasswordValidation = [
    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
        .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
        .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter')
        .matches(/[0-9]/).withMessage('Password must contain at least one number')
        .matches(/[!@#$%^&*_-]/).withMessage('Password must contain at least one special character: !@#$%^&*_'),
    body('confirmPassword')
        .notEmpty().withMessage('Confirm Password is required')
        .custom((value, { req }) => {
            if (value !== req.body.password) throw new Error("Passwords don't match");
            return true;
        }),
];

module.exports = { registerValidation, loginValidation, emailVerificationValidation, forgotPasswordValidation, resetPasswordValidation };