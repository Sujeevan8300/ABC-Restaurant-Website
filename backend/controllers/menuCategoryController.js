// controllers/menuCategoryController.js
const MenuCategoryModel = require('../models/menuCategoryModel');

class MenuCategoryController {
    static async create(req, res) {
        try {
            const { name, description, img } = req.body;
            if (!name || !description) {
                return res.status(400).json({ error: 'Name and description are required' });
            }
            const imageBuffer = img ? Buffer.from(img.replace(/^data:image\/\w+;base64,/, ""), 'base64') : null;
            const result = await MenuCategoryModel.create({ name, description, img: imageBuffer });
            res.status(201).json({ message: 'Category created successfully', categoryId: result.insertId });
        } catch (err) {
            res.status(500).json({ error: 'Database error' });
        }
    }

    static async getAll(req, res) {
        try {
            const categories = await MenuCategoryModel.findAll();
            categories.forEach(category => {
                if (category.img) {
                    category.img = category.img.toString('base64');
                }
            });
            res.status(200).json(categories);
        } catch (err) {
            res.status(500).json({ error: 'Database error' });
        }
    }

    // Other methods for update and delete
}

module.exports = MenuCategoryController;
