const { Router } = require("express");
const { requireAuth } = require("../middleware/requireAuth");
const { summaryController } = require("../controllers/summary.controller");

const router = Router();

// CAF-4
router.get("/summary", requireAuth, summaryController.get);

module.exports = router;

