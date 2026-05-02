const { Router } = require("express");
const { authController } = require("../controllers/auth.controller");

const router = Router();

// CAF-1
router.post("/users", authController.register);

module.exports = router;

