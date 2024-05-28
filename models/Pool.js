// models/Pool.js
const mongoose = require("mongoose");

const poolSchema = new mongoose.Schema({
    propertyType: {
        type: String,

        trim: true
    },
    propertyTitle: {
        type: String,

        trim: true
    },
    propertyURL: {
        type: String,

        trim: true
    },
    location: {
        type: String,

        trim: true
    },
    keyHighlights: {
        type: String,

        trim: true
    },
    propertyDocuments: {
        type: [String],

        default: []
    },
    propertyImages: {
        type: [String],

        default: []
    },
    poolSize: {
        type: Number,
    },
    estimatedMPY: {
        type: Number,
    },
    estimatedReturn: {
        type: Number,
    },
    estimatedMaturity: {
        type: Number,
    },
    softCap: {
        type: Number,
    },
    maxInvest: {
        type: Number,
    },
    poolOpen: {
        type: Date, // Assuming poolOpen is a date
    },
    actualMPY: {
        type: Number,
        default: 0
    },
    actualReturn: {
        type: Number,
        default: 0
    },
    actualMaturity: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        default: 'pending'
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
}, { timestamps: true });

// Indexing commonly queried fields for performance improvement
poolSchema.index({ propertyType: 1 });
poolSchema.index({ status: 1 });
poolSchema.index({ createdBy: 1 });

module.exports = mongoose.model("Pool", poolSchema);

// const mongoose = require("mongoose");

// const poolSchema = new mongoose.Schema({
//     propertyType: {
//         type: String,
//     },
//     propertyTitle: {
//         type: String,
//     },
//     propertyURL: {
//         type: String,
//     },
//     location: {
//         type: String,
//     },
//     keyHighlights: {
//         type: String,
//     },
//     propertyDocuments: {
//         type: [String],
//     },
//     propertyImages: {
//         type: [String],
//     },
//     poolSize: {
//         type: Number,
//     },
//     estimatedMPY: {
//         type: Number,
//     },
//     estimatedReturn: {
//         type: Number,
//     },
//     estimatedMaturity: {
//         type: Number,
//     },
//     softCap: {
//         type: Number,
//     },
//     maxInvest: {
//         type: Number,
//     },
//     poolOpen: {
//         type: Number,
//     },
//     actualMPY: {
//         type: Number,
//     },
//     actualReturn: {
//         type: Number,
//     },
//     actualMaturity: {
//         type: Number,
//     },
//     statuss: {
//         type: String,
//         default: 'pending'
//     }

// }, { timestamps: true });

// module.exports = mongoose.model("createNewPool", poolSchema);
