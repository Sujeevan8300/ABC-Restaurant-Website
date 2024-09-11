const ServiceService = require('../services/serviceServices');

class ServiceController {
    static async createService(req, res) {
        try {
            const { service_type, service_name, description, img } = req.body;

            if (!service_type || !service_name || !description) {
                return res.status(400).json({ error: 'Service type, name, and description are required' });
            }

            if (!img) {
                return res.status(400).json({ error: 'Image is required' });
            }

            const serviceId = await ServiceService.createService({ service_type, service_name, description, img });
            res.status(201).json({ message: 'Service created successfully', serviceId });
        } catch (error) {
            console.error('Create Service Error: ', error);
            res.status(500).json({ error: 'Failed to create service' });
        }
    }

    static async getAllServices(req, res) {
        try {
            const services = await ServiceService.getAllServices();
            res.status(200).json(services);
        } catch (error) {
            console.error('Fetch Services Error: ', error);
            res.status(500).json({ error: 'Failed to retrieve services' });
        }
    }

    static async updateService(req, res) {
        try {
            const { serviceId } = req.params;
            const { service_type, service_name, description, img } = req.body;
            console.log('Service controller'+ service_type, service_name, description, img );

            if (!service_type || !service_name || !description) {
                return res.status(400).json({ error: 'Service type, name, and description are required' });
            }

            await ServiceService.updateService(serviceId, { service_type, service_name, description, img });
            res.status(200).json({ message: 'Service updated successfully' });
        } catch (error) {
            console.error('Update Service Error: ', error);
            res.status(500).json({ error: 'Failed to update service' });
        }
    }

    static async deleteService(req, res) {
        try {
            const { serviceId } = req.params;
            await ServiceService.deleteService(serviceId);
            res.status(200).json({ message: 'Service deleted successfully' });
        } catch (error) {
            console.error('Delete Service Error: ', error);
            res.status(500).json({ error: 'Failed to delete service' });
        }
    }
}

module.exports = ServiceController;
