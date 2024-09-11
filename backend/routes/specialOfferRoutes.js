const express = require('express');
const router = express.Router();
const SpecialOfferController = require('../controllers/specialOfferController');

// Define the routes
router.post('/create-special-offer', SpecialOfferController.createOffer);
router.get('/get-all-special-offers', SpecialOfferController.getAllOffers);
router.put('/update-special-offer/:offerId', SpecialOfferController.updateOffer);
router.delete('/delete-special-offer/:offerId', SpecialOfferController.deleteOffer);

module.exports = router;
