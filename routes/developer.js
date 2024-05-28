const router = require("express").Router();
const developerController = require("../controllers/developerController");

router.post("/createLoginAsDev", developerController.createLoginAsDev);
router.get("/getAllDevDetails", developerController.getAllDevDetails);
router.get("/getDevDetailsByEmail/:email", developerController.getDevDetailsByEmail);
router.put("/updateDeveloperDetails/:email", developerController.updateDeveloperDetails);

module.exports = router;