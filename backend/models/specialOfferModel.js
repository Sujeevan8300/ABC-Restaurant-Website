const dbInstance = require('../config/dbConfig');

class SpecialOfferModel {
    static createOffer(offer) {
        const sql = `INSERT INTO specialoffer (title, description, img, discount_percentage, offer_start_date, offer_end_date, food_id, is_active) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        return new Promise((resolve, reject) => {
            dbInstance.getConnection().query(sql, offer, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
    }

    static getAllOffers() {
        const sql = `SELECT offer_id, title, description, img, discount_percentage, offer_start_date, offer_end_date, food_id, is_active FROM specialoffer`;
        return new Promise((resolve, reject) => {
            dbInstance.getConnection().query(sql, (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    }

    static updateOffer(offerId, { title, description, img, discount, startDate, endDate, foodId, isActive }) {
        const sql = img 
            ? `UPDATE specialoffer SET title = ?, description = ?, img = ?, discount_percentage = ?, offer_start_date = ?, offer_end_date = ?, food_id = ?, is_active = ? WHERE offer_id = ?`
            : `UPDATE specialoffer SET title = ?, description = ?, discount_percentage = ?, offer_start_date = ?, offer_end_date = ?, food_id = ?, is_active = ? WHERE offer_id = ?`;
    
        // Use the image buffer if it exists, otherwise just update without the image
        const values = img 
            ? [title, description, img, discount, startDate, endDate, foodId, isActive, offerId] 
            : [title, description, discount, startDate, endDate, foodId, isActive, offerId];
    
        return new Promise((resolve, reject) => {
            dbInstance.getConnection().query(sql, values, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
    }
    

    static deleteOffer(offerId) {
        const sql = `DELETE FROM specialoffer WHERE offer_id = ?`;
        return new Promise((resolve, reject) => {
            dbInstance.getConnection().query(sql, [offerId], (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
    }
}

module.exports = SpecialOfferModel;
