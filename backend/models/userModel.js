const dbInstance = require('../config/dbConfig');
const BaseModel = require('./BaseModel');

class UserModel extends BaseModel {

    constructor() {
        super('user');
    }

    static createUser(user) {
        const sql = `INSERT INTO user (email, password, first_name, last_name, city, address, phone, user_role) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        return new Promise((resolve, reject) => {
            dbInstance.getConnection().query(sql, user, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
    }

    static findUserByEmail(email) {
        const sql = 'SELECT * FROM user WHERE email = ?';
        return new Promise((resolve, reject) => {
            dbInstance.getConnection().query(sql, [email], (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
    }

    static findUserById(id) {
        const sql = 'SELECT user_id, email, first_name, last_name, city, address, phone, user_role FROM user WHERE user_id = ?';
        return new Promise((resolve, reject) => {
            dbInstance.getConnection().query(sql, [id], (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
    }
}

module.exports = UserModel;




