const SpecialOfferModel = require('../models/specialOfferModel');

class SpecialOfferService {
    static async createOffer({ 
        title, 
        description, 
        img, 
        discount, 
        startDate, 
        endDate, 
        foodId, 
        isActive 
    }) {
        // Convert base64 image to a buffer
        const imageBuffer = img ? Buffer.from(img.replace(/^data:image\/\w+;base64,/, ''), 'base64') : null;

        // Call the SpecialOfferModel with the correctly named fields
        const result = await SpecialOfferModel.createOffer([
            title,
            description,
            imageBuffer,
            discount,
            startDate,
            endDate,
            foodId,
            isActive
        ]);

        return result.insertId;  // Return the ID of the newly created offer
    }

    static async getAllOffers() {
        const offers = await SpecialOfferModel.getAllOffers();
        // Convert image buffer to base64 string if it exists
        return offers.map(offer => ({
            ...offer,
            img: offer.img ? offer.img.toString('base64') : null
        }));
    }

    static async updateOffer(offerId, { title, description, img, discount, startDate, endDate, foodId, isActive }) {
        // Convert base64 image to a buffer
        const imageBuffer = img ? Buffer.from(img.replace(/^data:image\/\w+;base64,/, ''), 'base64') : null;
    
        // Pass all values to the model to handle the database update
        await SpecialOfferModel.updateOffer(offerId, {
            title, 
            description, 
            img: imageBuffer,  // Use the buffer here
            discount, 
            startDate, 
            endDate, 
            foodId, 
            isActive
        });
    }    

    static async deleteOffer(offerId) {
        await SpecialOfferModel.deleteOffer(offerId);
    }
}

module.exports = SpecialOfferService;
