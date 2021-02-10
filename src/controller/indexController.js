const express = require('express');
const router = express.Router();
const userController = require('./userController');


router.use('/api/user',userController);

module.exports = router;
