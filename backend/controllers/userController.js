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

    static async createUser(req, res) {
        try {
            const userId = await UserService.createUser(req.body);
            res.status(201).json({ msg: 'User created successfully', userId });
        } catch (error) {
            res.status(400).json({ msg: error.message });
        }
    }

    static async updateUser(req, res) {
        try {
            const { userId } = req.params;
              // Extract the userId from the request parameters
            const updatedData = req.body;   // Extract the updated data from the request body
            const result = await UserService.updateUser(userId, updatedData);  // Call the service to update the user
            res.status(200).json(result);   // Send success response
        } catch (error) {
            res.status(500).json({ msg: error.message });  // Handle errors and send response
        }
    }

    static async deleteUser(req, res) {
        try {
            const userId = req.params.id;
            await UserService.deleteUser(userId);
            res.status(200).json({ msg: 'User deleted successfully' });
        } catch (error) {
            res.status(400).json({ msg: error.message });
        }
    }

    static async viewUsers(req, res) {
        try {
            const users = await UserService.getAllUsers();
            res.status(200).json({ users });
        } catch (error) {
            res.status(400).json({ msg: error.message });
        }
    }


    // get logged in user details.
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

    // Update user profile
    static async updateProfile(req, res) {
        try {
            const { userId } = req.params;  // Extract the userId from the request parameters
            const updatedData = req.body;   // Extract the updated data from the request body
            const result = await UserService.updateUser(userId, updatedData);  // Call the service to update the user
            res.status(200).json(result);   // Send success response
        } catch (error) {
            res.status(500).json({ msg: error.message });  // Handle errors and send response
        }
    }
}

module.exports = UserController;
