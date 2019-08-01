const express = require('express');

const router = express.Router();
const uploadCloud = require('../config/cloudinary.js');
const homeController = require('../controllers/home');
const adController = require('../controllers/ad');

/* Home */
router.get('/', homeController.index);

/* AD */
router.get('/ad/new', adController.newAd);

router.post('/ad/upload', uploadCloud.single('photo'), adController.processNewAd);

module.exports = router;
