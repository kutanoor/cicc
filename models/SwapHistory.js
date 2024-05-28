// models/SwapHistory.js
const mongoose = require("mongoose");

const swapHistorySchema = new mongoose.Schema({
  walletAddress: {
    type: String,
    required: true,
  },
  inAmount: {
    type: Number,
    required: true,
  },
  outAmount: {
    type: Number,
    required: true,
  },
  dateTime: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("SwapHistory", swapHistorySchema);
