const router = require("express").Router();
// const createPoolRoute = require("./createPoolRoute");
const poolController = require("../controllers/poolController");

// const createPoolFun = require("../controllers/poolController");
// const historyRoute = require("./historyRoutes");


router.post("/createPool", poolController.createPoolFun);
router.get("/allPool", poolController.getAllPool);
router.post("/getPoolByName", poolController.getPoolByName);
router.post("/getPoolById", poolController.getPoolById);



module.exports = router;
