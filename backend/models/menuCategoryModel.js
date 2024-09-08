const dbInstance = require('../config/dbConfig');

class MenuCategoryModel {
    static create(category) {
        const query = 'INSERT INTO menu_category (name, description, img) VALUES (?, ?, ?)';
        return new Promise((resolve, reject) => {
            dbInstance.getConnection().query(query, [category.name, category.description, category.img], (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
    }

    static findAll() {
        const query = 'SELECT category_id, name, description, img FROM menu_category';
        return new Promise((resolve, reject) => {
            dbInstance.getConnection().query(query, (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    }

    
}

module.exports = MenuCategoryModel;
