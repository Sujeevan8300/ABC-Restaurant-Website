// controllers/userController.js
const UserService = require('../services/userService');

class UserController {
    static async register(req, res) {
        console.log('Request body:', req.body);
        try {
            const userId = await UserService.registerUser(req.body);
            console.log(req.body);
            res.status(201).json({ msg: 'User registered successfully', userId });
        } catch (error) {
            res.status(400).json({ msg: error.message });
        }
    }

    static async login(req, res) {
        try {
            const { email, password } = req.body;
            const token = await UserService.loginUser(email, password);
            res.json({ status: 'success', token });
            console.log(res);
        } catch (error) {
            res.status(400).json({ msg: error.message });
        }
    }

    static async getLoggedInUserDetails(req, res) {
        try {
            const userDetails = await UserService.getUserDetails(req.user.id);
            res.json({
                status: 'success',
                user: {
                    id: userDetails.user_id,
                    email: userDetails.email,
                    first_name: userDetails.first_name,
                    last_name: userDetails.last_name,
                    city: userDetails.city,
                    address: userDetails.address,
                    phone: userDetails.phone,
                    role: userDetails.user_role
                }
            });
        } catch (error) {
            res.status(404).json({ msg: error.message });
        }
    }
}

module.exports = UserController;
