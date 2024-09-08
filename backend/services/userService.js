// services/userService.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');

class UserService {

    static async registerUser(userData) {
        const { email, password, confirmPassword, ...rest } = userData; // Exclude confirmPassword
        const existingUser = await UserModel.findUserByEmail(email);    // Abstracted data access
    
        if (existingUser.length > 0) {
            throw new Error('User already exists');
        }
    
        const hashedPassword = await bcrypt.hash(password, 10);
    
        // Ensure that confirmPassword is not included in the final array
        const result = await UserModel.createUser([email, hashedPassword, ...Object.values(rest)]);
        return result.insertId;
    }
    

    static async loginUser(email, password) {
        const user = await UserModel.findUserByEmail(email);

        if (user.length === 0) {
            throw new Error('User does not exist');
        }

        const isMatch = await bcrypt.compare(password, user[0].password);
        if (!isMatch) {
            throw new Error('Incorrect password');
        }

        const token = jwt.sign({ id: user[0].user_id, role: user[0].user_role, email: user[0].email }, 'your_jwt_secret', { expiresIn: '1h' });
        return token;
    }

    static async getUserDetails(id) {
        const user = await UserModel.findUserById(id);
        if (user.length === 0) {
            throw new Error('User not found');
        }
        return user[0];
    }
}

module.exports = UserService;


