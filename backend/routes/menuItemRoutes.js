const express = require('express');
const router = express.Router();
const MenuItemController = require('../controllers/menuItemController');

// Create a new menu item
router.post('/create-menu-items', MenuItemController.createMenuItem);

// Get all menu items
router.get('/get-all-menu-items', MenuItemController.getAllMenuItems);

// Update a menu item by ID
router.put('/update-menu-items/:food_id', MenuItemController.updateMenuItem);

// Delete a menu item by ID
router.delete('/delete-menu-items/:food_id', MenuItemController.deleteMenuItem);

module.exports = router;
