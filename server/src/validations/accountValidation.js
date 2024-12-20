const { body } = require('express-validator');
const constants = require('@/lib/uploadConfig');

const MAX_FILE_SIZE = constants.MAX_FILE_SIZE;
const ACCEPTED_FILE_TYPES = constants.ACCEPTED_FILE_TYPES.split(",");

// CHANGE AVATAR
const avatarValidator = [
     body('avatar')
        .custom((value, { req }) => {
            const file = req.file;
            
            if (!file) throw new Error('No file uploaded');
            if (!ACCEPTED_FILE_TYPES.includes(file.mimetype)) throw new Error(`Invalid file type. Accepted types are: ${ACCEPTED_FILE_TYPES.join(", ")}`);
            if (file.size > MAX_FILE_SIZE) throw new Error(`File size should not exceed ${MAX_FILE_SIZE / (1024 * 1024)}MB`);

            return true;
        }),
];

// UPDATE PROFILE
const updateProfileValidator = [
    body('name')
        .isString().withMessage('Name is required')
        .isLength({ min: 1 }).withMessage('Name is required'),
];

// CHANGE PASSWORD
const changePasswordValidator = [
    body('currentPassword')
        .isString().withMessage('Current Password must be a string')
        .isLength({ min: 8 }).withMessage('Current Password must be at least 8 characters long')
        .matches(/[A-Z]/).withMessage('Current Password must contain at least one uppercase letter')
        .matches(/[a-z]/).withMessage('Current Password must contain at least one lowercase letter')
        .matches(/[0-9]/).withMessage('Current Password must contain at least one number')
        .matches(/[!@#$%^&*_-]/).withMessage('Current Password must contain at least one special character: !@#$%^&*_-'),
    body('newPassword')
        .isString().withMessage('New Password must be a string')
        .isLength({ min: 8 }).withMessage('New Password must be at least 8 characters long')
        .matches(/[A-Z]/).withMessage('New Password must contain at least one uppercase letter')
        .matches(/[a-z]/).withMessage('New Password must contain at least one lowercase letter')
        .matches(/[0-9]/).withMessage('New Password must contain at least one number')
        .matches(/[!@#$%^&*_-]/).withMessage('New Password must contain at least one special character: !@#$%^&*_-'),
    body('confirmPassword')
        .isString().withMessage('Confirm Password is required')
        .custom((value, { req }) => {
            if (value !== req.body.newPassword) throw new Error("Passwords don't match");
            return true;
        }),
];

module.exports = { avatarValidator, updateProfileValidator, changePasswordValidator };