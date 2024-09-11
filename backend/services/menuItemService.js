const MenuItemModel = require('../models/menuItemModel');

class MenuItemService {
    static async createMenuItem({ name, description, price, available, img, category_id }) {
        const imageBuffer = img ? Buffer.from(img.replace(/^data:image\/\w+;base64,/, ''), 'base64') : null;
        const result = await MenuItemModel.createMenuItem([name, description, imageBuffer, price, available, category_id]);
        return result.insertId;
    }

    static async getAllMenuItems() {
        const menuItems = await MenuItemModel.getAllMenuItems();
        return menuItems.map(item => ({
            ...item,
            img: item.img ? item.img.toString('base64') : null
        }));
    }

    static async updateMenuItem(food_id, { name, description, price, available, img, category_id }) {
        const imageBuffer = img ? Buffer.from(img.replace(/^data:image\/\w+;base64,/, ''), 'base64') : null;
        await MenuItemModel.updateMenuItem(food_id, { name, description, price, available, img: imageBuffer, category_id });
    }

    static async deleteMenuItem(food_id) {
        await MenuItemModel.deleteMenuItem(food_id);
    }
}

module.exports = MenuItemService;
