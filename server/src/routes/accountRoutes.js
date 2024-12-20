const express = require('express');
const router = express.Router();

const upload = require('@/utils/multerStorage');

const accountController = require('@/controllers/accountController');

const { requireAuth } = require('@/middleware/authMiddleware');
const validate = require('@/middleware/validate');

const { avatarValidator, updateProfileValidator, changePasswordValidator } = require('@/validations/accountValidation')

// CHANGE AVATAR
router.post('/change-avatar', requireAuth(), upload.single('avatar'), validate(avatarValidator), accountController.changeAvatar);

// DELETE AVATAR
router.post('/delete-avatar', requireAuth(), accountController.deleteAvatar);

// UPDATE PROFILE
router.post('/update-profile', requireAuth(), validate(updateProfileValidator), accountController.updateProfile);

// CHANGE PASSWORSD
router.post('/change-password', requireAuth(), validate(changePasswordValidator), accountController.changePassword);

module.exports = router;