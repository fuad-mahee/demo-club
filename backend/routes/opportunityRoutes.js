const express = require('express');
const router = express.Router();
const {
    getOpportunities,
    getOpportunity,
    createOpportunity,
    updateOpportunity,
    deleteOpportunity,
    expressInterest
} = require('../controllers/opportunityController');

const { protect } = require('../middleware/authMiddleware');

// Public routes
router.get('/', getOpportunities);
router.get('/:id', getOpportunity);

// Protected routes
router.post('/', protect, createOpportunity);
router.put('/:id', protect, updateOpportunity);
router.delete('/:id', protect, deleteOpportunity);
router.post('/:id/interest', protect, expressInterest);

module.exports = router;