const SpecialOfferService = require('../services/specialOfferService');

class SpecialOfferController {
    static async createOffer(req, res) {
        try {
            const { 
                offer_title, 
                offer_description, 
                offer_img, 
                discount_percentage, 
                offer_start_date, 
                offer_end_date, 
                food_id, 
                is_active 
            } = req.body;
            
            console.log({
                offer_title, 
                offer_description, 
                offer_img, 
                discount_percentage, 
                offer_start_date, 
                offer_end_date, 
                food_id, 
                is_active 
            });

            if (!offer_title || !offer_description || !discount_percentage || !offer_start_date || !offer_end_date || !food_id) {
                return res.status(400).json({ error: 'All fields are required' });
            }

            if (!offer_img) {
                return res.status(400).json({ error: 'Image is required' });
            }

            const offerId = await SpecialOfferService.createOffer({
                title: offer_title,
                description: offer_description,
                img: offer_img,
                discount: discount_percentage,
                startDate: offer_start_date,
                endDate: offer_end_date,
                foodId: food_id,
                isActive: is_active
            });
            res.status(201).json({ message: 'Offer created successfully', offerId });
        } catch (error) {
            console.error('Create Offer Error: ', error);
            res.status(500).json({ error: 'Failed to create offer' });
        }
    } 

    static async getAllOffers(req, res) {
        try {
            const offers = await SpecialOfferService.getAllOffers();
            res.status(200).json(offers);
        } catch (error) {
            console.error('Fetch Offers Error: ', error);
            res.status(500).json({ error: 'Failed to retrieve offers' });
        }
    }

    static async updateOffer(req, res) {
        try {
            const { offerId } = req.params;
            const {
                offer_title, 
                offer_description, 
                offer_img, 
                discount_percentage, 
                offer_start_date, 
                offer_end_date, 
                food_id, 
                is_active 
            } = req.body;
    
            console.log({
                offer_title, 
                offer_description, 
                offer_img, 
                discount_percentage, 
                offer_start_date, 
                offer_end_date, 
                food_id, 
                is_active 
            });
    
            if (!offer_title || !offer_description || !discount_percentage || !offer_start_date || !offer_end_date || !food_id) {
                return res.status(400).json({ error: 'All fields are required' });
            }
    
            await SpecialOfferService.updateOffer(offerId, {
                title: offer_title,
                description: offer_description,
                img: offer_img,  // this could be base64-encoded string
                discount: discount_percentage,
                startDate: offer_start_date,
                endDate: offer_end_date,
                foodId: food_id,
                isActive: is_active
            });
    
            res.status(200).json({ message: 'Offer updated successfully' });
        } catch (error) {
            console.error('Update Offer Error: ', error);
            res.status(500).json({ error: 'Failed to update offer' });
        }
    }
    
    static async deleteOffer(req, res) {
        try {
            const { offerId } = req.params;
            await SpecialOfferService.deleteOffer(offerId);
            res.status(200).json({ message: 'Offer deleted successfully' });
        } catch (error) {
            console.error('Delete Offer Error: ', error);
            res.status(500).json({ error: 'Failed to delete offer' });
        }
    }
}

module.exports = SpecialOfferController;
