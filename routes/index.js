const router = require("express").Router();
const userRoute = require("./userRoutes");
const historyRoute = require("./historyRoutes");
const poolRoute = require("./createPool");
const loginAsDevRoutes = require("./developer");


router.use("/user", userRoute);
router.use("/history", historyRoute);
router.use("/pool", poolRoute);
router.use("/loginAsDev", loginAsDevRoutes);


module.exports = router;
