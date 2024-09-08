// routes/menuCategoryRoutes.js
const express = require('express');
const router = express.Router();
const MenuCategoryController = require('../controllers/menuCategoryController');

router.post('/menu-categories', MenuCategoryController.create);
router.get('/menu-categories', MenuCategoryController.getAll);
// Other routes for update and delete

module.exports = router;
