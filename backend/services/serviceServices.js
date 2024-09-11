const ServiceModel = require('../models/serviceModel');

class ServiceService {
    static async createService({ service_type, service_name, description, img }) {
        const imageBuffer = img ? Buffer.from(img.replace(/^data:image\/\w+;base64,/, ''), 'base64') : null;
        const result = await ServiceModel.createService([service_type, service_name, description, imageBuffer]);
        return result.insertId;
    }

    static async getAllServices() {
        const services = await ServiceModel.getAllServices();
        return services.map(service => ({
            ...service,
            img: service.img ? service.img.toString('base64') : null
        }));
    }

    static async updateService(serviceId, { service_type, service_name, description, img }) {
        const imageBuffer = img ? Buffer.from(img.replace(/^data:image\/\w+;base64,/, ''), 'base64') : null;
        await ServiceModel.updateService(serviceId, { service_type, service_name, description, img: imageBuffer });
    }

    static async deleteService(serviceId) {
        await ServiceModel.deleteService(serviceId);
    }
}

module.exports = ServiceService;
