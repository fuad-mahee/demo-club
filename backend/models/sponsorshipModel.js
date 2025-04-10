const mongoose = require('mongoose');

const sponsorshipSchema = mongoose.Schema({
    event: {
        name: {
            type: String,
            required: true
        },
        id: {
            type: String,
            required: true
        },
        club: {
            type: String,
            required: true
        },
        date: {
            type: String,
            required: true
        }
    },
    sponsor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    packageType: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    message: {
        type: String
    },
    requirements: {
        type: String
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Sponsorship', sponsorshipSchema);