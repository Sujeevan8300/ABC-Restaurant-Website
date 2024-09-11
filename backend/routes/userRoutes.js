const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const { authenticateToken, checkAdmin } = require('../utils/authUtils');

// Admin routes for managing users
router.post('/create-user', authenticateToken,checkAdmin, UserController.createUser); // Only admins can create users
router.put('/update-user/:userId', authenticateToken, checkAdmin, UserController.updateUser); // Only admins can update users
router.delete('/delete-user/:id', authenticateToken, checkAdmin, UserController.deleteUser); // Only admins can delete users
router.get('/view-users', authenticateToken, checkAdmin, UserController.viewUsers); // Only admins can view all users

// Non-admin routes (accessible to all authenticated users)
router.post('/register', UserController.register); 
router.post('/login', UserController.login); 
router.get('/get-logged-in-user-details', authenticateToken, UserController.getLoggedInUserDetails);
router.put('/update-profile', authenticateToken, UserController.updateProfile);

module.exports = router;