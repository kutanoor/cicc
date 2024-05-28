// models/Deposit.js
const mongoose = require("mongoose");

const depositSchema = new mongoose.Schema({
  walletAddress: {
    type: String,
    required: true,
  },
  depositAmount: {
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
  referrer: {
    type: String,
    required: true,
  },

  depositDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Deposit", depositSchema);
