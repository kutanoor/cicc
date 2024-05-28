// models/Claim.js
const mongoose = require("mongoose");

const claimSchema = new mongoose.Schema({
  walletAddress: {
    type: String,
    required: true,
  },
  claimAmount: {
    type: Number,
    default: 0,
  },
  poolId: {
    type: Number,
    default: 0,
  },
  transactionHash: {
    type: String,
    required: true,
  },
  claimDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Claim", claimSchema);
