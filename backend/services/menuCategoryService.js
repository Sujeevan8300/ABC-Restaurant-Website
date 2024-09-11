const MenuCategoryModel = require('../models/menuCategoryModel');

class MenuCategoryService {
    static async createCategory({ name, description, img }) {
        // Convert base64 string to buffer
        const imageBuffer = img ? Buffer.from(img.replace(/^data:image\/\w+;base64,/, ''), 'base64') : null;
        const result = await MenuCategoryModel.createCategory([name, description, imageBuffer]);
        return result.insertId;
    }

    static async getAllCategories() {
        const categories = await MenuCategoryModel.getAllCategories();
        // Convert binary image data to base64 for sending to the client
        return categories.map(category => ({
            ...category,
            img: category.img ? category.img.toString('base64') : null
        }));
    }

    static async updateCategory(categoryId, { name, description, img }) {
        const imageBuffer = img ? Buffer.from(img.replace(/^data:image\/\w+;base64,/, ''), 'base64') : null;
        await MenuCategoryModel.updateCategory(categoryId, { name, description, img: imageBuffer });
    }

    static async deleteCategory(categoryId) {
        await MenuCategoryModel.deleteCategory(categoryId);
    }
}

module.exports = MenuCategoryService;
