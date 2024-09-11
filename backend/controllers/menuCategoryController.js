const MenuCategoryService = require('../services/menuCategoryService');

class MenuCategoryController {
    static async createCategory(req, res) {
        try {
            const { name, description, img } = req.body;

            if (!name || !description) {
                return res.status(400).json({ error: 'Name and description are required' });
            }

            if (!img) {
                return res.status(400).json({ error: 'Image is required' });
            }

            const categoryId = await MenuCategoryService.createCategory({ name, description, img });
            res.status(201).json({ message: 'Category created successfully', categoryId });
        } catch (error) {
            console.error('Create Category Error: ', error);
            res.status(500).json({ error: 'Failed to create category' });
        }
    }

    static async getAllCategories(req, res) {
        try {
            const categories = await MenuCategoryService.getAllCategories();
            res.status(200).json(categories);
        } catch (error) {
            console.error('Fetch Categories Error: ', error);
            res.status(500).json({ error: 'Failed to retrieve categories' });
        }
    }

    static async updateCategory(req, res) {
        try {
            const { categoryId } = req.params;
            const { name, description, img } = req.body;

            if (!name || !description) {
                return res.status(400).json({ error: 'Name and description are required' });
            }

            await MenuCategoryService.updateCategory(categoryId, { name, description, img });
            res.status(200).json({ message: 'Category updated successfully' });
        } catch (error) {
            console.error('Update Category Error: ', error);
            res.status(500).json({ error: 'Failed to update category' });
        }
    }

    static async deleteCategory(req, res) {
        try {
            const { categoryId } = req.params;
            await MenuCategoryService.deleteCategory(categoryId);
            res.status(200).json({ message: 'Category deleted successfully' });
        } catch (error) {
            console.error('Delete Category Error: ', error);
            res.status(500).json({ error: 'Failed to delete category' });
        }
    }
}

module.exports = MenuCategoryController;
