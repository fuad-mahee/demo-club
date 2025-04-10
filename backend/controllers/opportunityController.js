const asyncHandler = require('express-async-handler');
const Opportunity = require('../models/opportunityModel');
const User = require('../models/userModel');

// @desc    Get all sponsorship opportunities
// @route   GET /api/opportunities
// @access  Public
const getOpportunities = asyncHandler(async (req, res) => {
    const opportunities = await Opportunity.find().sort({ date: 1 });
    res.status(200).json(opportunities);
});

// @desc    Get single sponsorship opportunity
// @route   GET /api/opportunities/:id
// @access  Public
const getOpportunity = asyncHandler(async (req, res) => {
    const opportunity = await Opportunity.findById(req.params.id);
    
    if (!opportunity) {
        res.status(404);
        throw new Error('Opportunity not found');
    }
    
    res.status(200).json(opportunity);
});

// @desc    Create new sponsorship opportunity
// @route   POST /api/opportunities
// @access  Private (admin or specific roles)
const createOpportunity = asyncHandler(async (req, res) => {
    const {
        name,
        description,
        date,
        club,
        attendance,
        startingPrice,
        location,
        packages,
        contactPerson,
        contactEmail,
        status,
        image
    } = req.body;

    // Validate required fields
    if (!name || !description || !date || !club || !startingPrice) {
        res.status(400);
        throw new Error('Please provide all required fields');
    }

    // Create opportunity
    const opportunity = await Opportunity.create({
        name,
        description,
        date,
        club,
        attendance,
        startingPrice,
        location,
        packages: packages || [],
        contactPerson,
        contactEmail,
        status: status || 'upcoming',
        image: image || ''
    });

    if (opportunity) {
        res.status(201).json(opportunity);
    } else {
        res.status(400);
        throw new Error('Invalid opportunity data');
    }
});

// @desc    Update sponsorship opportunity
// @route   PUT /api/opportunities/:id
// @access  Private (admin or specific roles)
const updateOpportunity = asyncHandler(async (req, res) => {
    const opportunity = await Opportunity.findById(req.params.id);
    
    if (!opportunity) {
        res.status(404);
        throw new Error('Opportunity not found');
    }
    
    const updatedOpportunity = await Opportunity.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    
    res.status(200).json(updatedOpportunity);
});

// @desc    Delete sponsorship opportunity
// @route   DELETE /api/opportunities/:id
// @access  Private (admin only)
const deleteOpportunity = asyncHandler(async (req, res) => {
    const opportunity = await Opportunity.findById(req.params.id);
    
    if (!opportunity) {
        res.status(404);
        throw new Error('Opportunity not found');
    }
    
    await opportunity.deleteOne();
    
    res.status(200).json({ id: req.params.id });
});

// @desc    Express interest in an opportunity
// @route   POST /api/opportunities/:id/interest
// @access  Private (sponsor)
const expressInterest = asyncHandler(async (req, res) => {
    const opportunity = await Opportunity.findById(req.params.id);
    
    if (!opportunity) {
        res.status(404);
        throw new Error('Opportunity not found');
    }
    
    // Check if sponsor has already expressed interest
    const alreadyInterested = opportunity.interestedSponsors.includes(req.user.id);
    
    if (alreadyInterested) {
        res.status(400);
        throw new Error('You have already expressed interest in this opportunity');
    }
    
    // Add sponsor to interested sponsors
    opportunity.interestedSponsors.push(req.user.id);
    await opportunity.save();
    
    res.status(200).json({
        message: 'Interest expressed successfully',
        opportunityId: opportunity._id
    });
});

module.exports = {
    getOpportunities,
    getOpportunity,
    createOpportunity,
    updateOpportunity,
    deleteOpportunity,
    expressInterest
};