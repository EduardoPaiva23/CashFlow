const { Router } = require("express");
const { requireAuth } = require("../middleware/requireAuth");
const { meController } = require("../controllers/me.controller");

const router = Router();

router.get("/me", requireAuth, meController.me);

module.exports = router;

