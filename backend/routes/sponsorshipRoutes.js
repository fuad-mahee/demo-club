const express = require('express');
const router = express.Router();
const {
    submitSponsorshipRequest,
    getSponsorships,
    getAllSponsorships,
    updateSponsorshipStatus,
    deleteSponsorship
} = require('../controllers/sponsorshipController');

const { protect } = require('../middleware/authMiddleware');

// Sponsor routes
router.post('/', protect, submitSponsorshipRequest);
router.get('/', protect, getSponsorships);

// Admin routes
router.get('/all', protect, getAllSponsorships);
router.put('/:id', protect, updateSponsorshipStatus);

// Both sponsors and admins
router.delete('/:id', protect, deleteSponsorship);

module.exports = router;