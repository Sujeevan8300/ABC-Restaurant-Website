const express = require('express');
const router = express.Router();
const MenuCategoryController = require('../controllers/menuCategoryController');

// Define the routes
router.post('/create-menu-categories', MenuCategoryController.createCategory);
router.get('/get-all-menu-categories', MenuCategoryController.getAllCategories);
router.put('/update-menu-categories/:categoryId', MenuCategoryController.updateCategory);
router.delete('/delete-menu-categories/:categoryId', MenuCategoryController.deleteCategory);

module.exports = router;
