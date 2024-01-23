const userController = require("../controller/userController");
const express = require("express");
const router = express.Router();

router.post("/register-user", userController.registerUser);
router.post("/login-user", userController.loginUser);
router.get("/get-all-users", userController.getAllUsers);


module.exports = router;
