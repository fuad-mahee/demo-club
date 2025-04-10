const asyncHandler = require('express-async-handler');
const Sponsorship = require('../models/sponsorshipModel');
const User = require('../models/userModel');

// @desc    Submit a new sponsorship request
// @route   POST /api/sponsorships
// @access  Private (sponsors only)
const submitSponsorshipRequest = asyncHandler(async (req, res) => {
    const { event, packageType, amount, message, requirements } = req.body;

    // Validate required fields
    if (!event || !packageType || !amount) {
        res.status(400);
        throw new Error('Please provide all required fields');
    }

    // Check if user is a sponsor
    if (req.user.role !== 'sponsor') {
        res.status(403);
        throw new Error('Only sponsors can submit sponsorship requests');
    }

    // Create sponsorship request
    const sponsorship = await Sponsorship.create({
        event,
        sponsor: req.user._id,
        packageType,
        amount,
        message,
        requirements,
        status: 'pending'
    });

    if (sponsorship) {
        res.status(201).json(sponsorship);
    } else {
        res.status(400);
        throw new Error('Invalid sponsorship data');
    }
});

// @desc    Get all sponsorship requests for current sponsor
// @route   GET /api/sponsorships
// @access  Private (sponsors only)
const getSponsorships = asyncHandler(async (req, res) => {
    // Check if user is a sponsor
    if (req.user.role !== 'sponsor') {
        res.status(403);
        throw new Error('Only sponsors can view their sponsorship requests');
    }

    const sponsorships = await Sponsorship.find({ sponsor: req.user._id })
        .sort({ createdAt: -1 });
    
    res.status(200).json(sponsorships);
});

// @desc    Get all sponsorship requests (for admins)
// @route   GET /api/sponsorships/all
// @access  Private (admin only)
const getAllSponsorships = asyncHandler(async (req, res) => {
    // Check if user is an admin
    if (req.user.role !== 'panel' && req.user.role !== 'registrar') {
        res.status(403);
        throw new Error('Not authorized to view all sponsorship requests');
    }

    const sponsorships = await Sponsorship.find()
        .populate('sponsor', 'name email phone company')
        .sort({ createdAt: -1 });
    
    res.status(200).json(sponsorships);
});

// @desc    Update sponsorship status
// @route   PUT /api/sponsorships/:id
// @access  Private (admin only)
const updateSponsorshipStatus = asyncHandler(async (req, res) => {
    const { status } = req.body;

    // Validate status
    if (!status || !['pending', 'approved', 'rejected'].includes(status)) {
        res.status(400);
        throw new Error('Please provide a valid status');
    }

    // Check if user is an admin
    if (req.user.role !== 'panel' && req.user.role !== 'registrar') {
        res.status(403);
        throw new Error('Not authorized to update sponsorship status');
    }

    const sponsorship = await Sponsorship.findById(req.params.id);
    
    if (!sponsorship) {
        res.status(404);
        throw new Error('Sponsorship request not found');
    }
    
    sponsorship.status = status;
    const updatedSponsorship = await sponsorship.save();
    
    res.status(200).json(updatedSponsorship);
});

// @desc    Delete sponsorship request
// @route   DELETE /api/sponsorships/:id
// @access  Private (sponsors can delete their own, admins can delete any)
const deleteSponsorship = asyncHandler(async (req, res) => {
    const sponsorship = await Sponsorship.findById(req.params.id);
    
    if (!sponsorship) {
        res.status(404);
        throw new Error('Sponsorship request not found');
    }
    
    // Check if user is authorized to delete
    if (
        sponsorship.sponsor.toString() !== req.user.id && 
        req.user.role !== 'panel' && 
        req.user.role !== 'registrar'
    ) {
        res.status(403);
        throw new Error('Not authorized to delete this sponsorship request');
    }
    
    await sponsorship.deleteOne();
    
    res.status(200).json({ id: req.params.id });
});

module.exports = {
    submitSponsorshipRequest,
    getSponsorships,
    getAllSponsorships,
    updateSponsorshipStatus,
    deleteSponsorship
};