// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const { authenticateToken } = require('../utils/authUtils');

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/get-logged-in-user-details', authenticateToken, UserController.getLoggedInUserDetails);

module.exports = router;
