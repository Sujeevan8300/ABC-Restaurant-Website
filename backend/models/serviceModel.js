const dbInstance = require('../config/dbConfig');

class ServiceModel {
    static createService(service) {
        const sql = 'INSERT INTO services (service_type, service_name, description, img) VALUES (?, ?, ?, ?)';
        return new Promise((resolve, reject) => {
            dbInstance.getConnection().query(sql, service, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
    }

    static getAllServices() {
        const sql = 'SELECT service_id, service_type, service_name, description, img FROM services';
        return new Promise((resolve, reject) => {
            dbInstance.getConnection().query(sql, (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    }

    static updateService(serviceId, { service_type, service_name, description, img }) {
        const sql = img 
            ? 'UPDATE services SET service_type = ?, service_name = ?, description = ?, img = ? WHERE service_id = ?'
            : 'UPDATE services SET service_type = ?, service_name = ?, description = ? WHERE service_id = ?';

        const values = img ? [service_type, service_name, description, img, serviceId] : [service_type, service_name, description, serviceId];

        return new Promise((resolve, reject) => {
            dbInstance.getConnection().query(sql, values, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
        
    }

    static deleteService(serviceId) {
        const sql = 'DELETE FROM services WHERE service_id = ?';
        return new Promise((resolve, reject) => {
            dbInstance.getConnection().query(sql, [serviceId], (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
    }
}

module.exports = ServiceModel;
