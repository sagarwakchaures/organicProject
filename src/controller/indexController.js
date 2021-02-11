const express = require('express');
const router = express.Router();
const userController = require('./userController');
const pageController = require('./pageController');


router.use('/api/user',userController);
router.use('/api/page',pageController);

module.exports = router;
