const dbInstance = require('../config/dbConfig');

class MenuCategoryModel {
    static createCategory(category) {
        const sql = `INSERT INTO menu_category (name, description, img) VALUES (?, ?, ?)`;
        return new Promise((resolve, reject) => {
            dbInstance.getConnection().query(sql, category, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
    }

    static getAllCategories() {
        const sql = `SELECT category_id, name, description, img FROM menu_category`;
        return new Promise((resolve, reject) => {
            dbInstance.getConnection().query(sql, (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    }

    static updateCategory(categoryId, { name, description, img }) {
        const sql = img 
            ? `UPDATE menu_category SET name = ?, description = ?, img = ? WHERE category_id = ?`
            : `UPDATE menu_category SET name = ?, description = ? WHERE category_id = ?`;

        const values = img ? [name, description, img, categoryId] : [name, description, categoryId];

        return new Promise((resolve, reject) => {
            dbInstance.getConnection().query(sql, values, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
    }

    static deleteCategory(categoryId) {
        const sql = `DELETE FROM menu_category WHERE category_id = ?`;
        return new Promise((resolve, reject) => {
            dbInstance.getConnection().query(sql, [categoryId], (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
    }
}

module.exports = MenuCategoryModel;
