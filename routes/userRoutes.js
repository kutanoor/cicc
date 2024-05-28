const router = require("express").Router();
const userController = require("../controllers/userController");
const authMiddleware=require("../middleware/auth")


router.post('/signup',userController.signup);
router.post('/getUser', userController.getUser);
router.post('/login', userController.login);
router.get('/getUserDetails',userController.getAllUsersWithDetails);

module.exports=router