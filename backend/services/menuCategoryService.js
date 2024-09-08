// services/menuCategoryService.js
const MenuCategoryModel = require('../models/menuCategoryModel');

class MenuCategoryService {
    static async createCategory(data) {
        // Business logic or validation before saving to the database
        return await MenuCategoryModel.create(data);
    }

    static async getAllCategories() {
        return await MenuCategoryModel.findAll();
    }

    // Other methods for update and delete
}

module.exports = MenuCategoryService;
