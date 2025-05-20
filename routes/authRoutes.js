const express = require("express");
const router = express.Router();
const authController = require("../controllers/authControllers");
const { validateRegister, validateLogin } = require("../utils/validator");

// Register route
router.post("/register", validateRegister, authController.register);

// Login route
router.post("/login", validateLogin, authController.login);

module.exports = router;
