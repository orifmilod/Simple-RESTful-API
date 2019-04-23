const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/checkAuth');
const userController = require('../controller/user.js');

//Handling incoming requests
router.post('/signup', userController.SIGN_UP);
router.post('/signin', userController.SIGN_IN);
router.delete('/:userID', checkAuth, userController.DELETE_USER);

module.exports = router;