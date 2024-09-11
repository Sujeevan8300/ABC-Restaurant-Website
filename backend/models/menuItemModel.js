const dbInstance = require('../config/dbConfig');

class MenuItemModel {
    static createMenuItem(item) {
        const sql = `INSERT INTO menu_items (name, description, img, price, available, category_id) VALUES (?, ?, ?, ?, ?, ?)`;
        return new Promise((resolve, reject) => {
            dbInstance.getConnection().query(sql, item, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
    }

    static getAllMenuItems() {
        const sql = `SELECT food_id, name, description, img, price, available, category_id FROM menu_items`;
        return new Promise((resolve, reject) => {
            dbInstance.getConnection().query(sql, (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    }

    static updateMenuItem(food_id, { name, description, price, available, img, category_id }) {
        const sql = img 
            ? `UPDATE menu_items SET name = ?, description = ?, img = ?, price = ?, available = ?, category_id = ? WHERE food_id = ?`
            : `UPDATE menu_items SET name = ?, description = ?, price = ?, available = ?, category_id = ? WHERE food_id = ?`;

        const values = img 
            ? [name, description, img, price, available, category_id, food_id]
            : [name, description, price, available, category_id, food_id];

        return new Promise((resolve, reject) => {
            dbInstance.getConnection().query(sql, values, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
    }

    static deleteMenuItem(food_id) {
        const sql = `DELETE FROM menu_items WHERE food_id = ?`;
        return new Promise((resolve, reject) => {
            dbInstance.getConnection().query(sql, [food_id], (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
    }
}

module.exports = MenuItemModel;
