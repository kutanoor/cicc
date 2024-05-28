const Deposit = require("../models/Deposit");
const Claim = require("../models/Claim");
const SwapHistory=require("../models/SwapHistory")

const historyController = {};

historyController.addDepositHistory = async (req, res) => {
  try {
    const { walletAddress, depositAmount, poolId, transactionHash, referrer } =
      req.body;
    const deposit = new Deposit({
      walletAddress,
      depositAmount,
      poolId,
      transactionHash,
      referrer,
    });
    await deposit.save();
    res
      .status(200)
      .json({ message: "Deposit history added successfully", deposit });
  } catch (error) {
    console.error("Error in addDepositHistory:", error);
    res.status(500).json({ message: error.message });
  }
};
historyController.addSwapHistory = async (req, res) => {
   try {
     const { walletAddress, inAmount, outAmount } = req.body;
     const swapHistory = new SwapHistory({
       walletAddress,
       inAmount,
       outAmount,
     });
     await swapHistory.save();
     res.status(201).json({message:"Swap History added",swapHistory});
   } catch (error) {
     res.status(400).json({ message: error.message });
   }
};

historyController.addClaimHistory = async (req, res) => {
  try {
    const { walletAddress, claimAmount, poolId, transactionHash } = req.body;
    const claim = new Claim({
      walletAddress,
      claimAmount,
      poolId,
      transactionHash,
    });
    await claim.save();
    res
      .status(200)
      .json({ message: "Claim history added successfully", claim });
  } catch (error) {
    console.error("Error in addClaimHistory:", error);
    res.status(500).json({ message: error.message });
  }
};

historyController.getDepositHistory = async (req, res) => {
  try {
    const walletAddress = req.query.walletAddress;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const deposits = await Deposit.find({ walletAddress })
      .skip(skip)
      .limit(limit);
    res.status(200).json(deposits);
  } catch (error) {
    console.error("Error in getDepositHistory:", error);
    res.status(500).json({ message: error.message });
  }
};

historyController.getClaimHistory = async (req, res) => {
  try {
    const walletAddress = req.query.walletAddress;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const claims = await Claim.find({ walletAddress }).skip(skip).limit(limit);
    res.status(200).json(claims);
  } catch (error) {
    console.error("Error in getClaimHistory:", error);
    res.status(500).json({ message: error.message });
  }
};
historyController.getSwapHistory = async (req, res) => {
  try {
    const walletAddress = req.query.walletAddress;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const claims = await SwapHistory.find({ walletAddress }).skip(skip).limit(limit);
    res.status(200).json(claims);
  } catch (error) {
    console.error("Error in get Swap History:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = historyController;
