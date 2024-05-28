// models/Deposit.js
const mongoose = require("mongoose");

const developerSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
    },
    phoneNumber: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    website: {
        type: String,
    },
    role: {
        type: String,
    },
    registrationCertificate: {
        type: String,
    },
    address: {
        type: String,
    },
    country: {
        type: String,
    },
    state: {
        type: String,
    },
    city: {
        type: String,
    },
    pincode: {
        type: String,
    },
    kycDetails: {
        type: String,
    },
    Statuss: {
        type: String,
        default: 'not_applied'
    }

}, {
    timestamps: true,
});

module.exports = mongoose.model("Developer", developerSchema);
