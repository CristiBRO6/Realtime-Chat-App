const express = require('express');
const router = express.Router();

const imagesController = require('@/controllers/imageController');

// AVATAR
router.get('/avatar/:id', imagesController.getAvatarImage);

module.exports = router;
