const router = require("express").Router();
const historyController = require("../controllers/historyController");


router.post("/addDepositHistory", historyController.addDepositHistory);
router.post(
  "/addSwapHistory",
 
  historyController.addSwapHistory
);
router.post(
  "/addClaimHistory",
  
  historyController.addClaimHistory
);
router.get("/getDepositHistory",historyController.getDepositHistory);
router.get(
  "/getSwapHistory",
  
  historyController.getSwapHistory
);
router.get(
  "/getClaimHistory",
 
  historyController.getClaimHistory
);


module.exports = router;
