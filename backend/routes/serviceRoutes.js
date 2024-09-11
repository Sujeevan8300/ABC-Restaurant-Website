const express = require('express');
const router = express.Router();
const ServiceController = require('../controllers/serviceController');

// Define the routes
router.post('/create-service', ServiceController.createService);
router.get('/get-all-services', ServiceController.getAllServices);
router.put('/update-service/:serviceId', ServiceController.updateService);
router.delete('/delete-service/:serviceId', ServiceController.deleteService);

module.exports = router;
