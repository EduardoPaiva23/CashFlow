const { Router } = require("express");
const { authController } = require("../controllers/auth.controller");

const router = Router();

// CAF-2
router.post("/sessions", authController.login);

module.exports = router;

