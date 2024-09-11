const MenuItemService = require('../services/menuItemService');

class MenuItemController {
    static async createMenuItem(req, res) {
        try {
            const { name, description, price, available, img, category_id } = req.body;
            const foodId = await MenuItemService.createMenuItem({ name, description, price, available, img, category_id });
            res.status(201).json({ message: 'Menu item created successfully', foodId });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async getAllMenuItems(req, res) {
        try {
            const menuItems = await MenuItemService.getAllMenuItems();
            res.status(200).json(menuItems);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async updateMenuItem(req, res) {
        try {
            const { food_id } = req.params;
            const { name, description, price, available, img, category_id } = req.body;
            await MenuItemService.updateMenuItem(food_id, { name, description, price, available, img, category_id });
            res.status(200).json({ message: 'Menu item updated successfully' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async deleteMenuItem(req, res) {
        try {
            const { food_id } = req.params;
            await MenuItemService.deleteMenuItem(food_id);
            res.status(200).json({ message: 'Menu item deleted successfully' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = MenuItemController;
