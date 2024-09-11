// models/userModel.js
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

    static updateUser(userId, userData) {
        // Correct SQL query syntax for UPDATE
        const sql = `UPDATE user SET email = ?, password = ?, first_name = ?, last_name = ?, city = ?, address = ?, phone = ?, user_role = ? WHERE user_id = ?`;
    
        return new Promise((resolve, reject) => {
            // Use userData array to supply the values for the placeholders
            dbInstance.getConnection().query(sql, [
                userData.email,
                userData.password,
                userData.firstName,
                userData.lastName,
                userData.city,
                userData.address,
                userData.phone,
                userData.role,
                userId
            ], (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
    }
    

    static deleteUser(userId) {
        const sql = `DELETE FROM user WHERE user_id = ?`;
        return new Promise((resolve, reject) => {
            dbInstance.getConnection().query(sql, [userId], (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
    }

    static getAllUsers() {
        const sql = `SELECT user_id, email, password, first_name, last_name, city, address, phone, user_role FROM user`;
        return new Promise((resolve, reject) => {
            dbInstance.getConnection().query(sql, (err, result) => {
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
        const sql = 'SELECT * FROM user WHERE user_id = ?';
        return new Promise((resolve, reject) => {
            dbInstance.getConnection().query(sql, [id], (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
    }
}

module.exports = UserModel;
