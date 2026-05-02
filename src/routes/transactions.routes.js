const { Router } = require("express");
const { requireAuth } = require("../middleware/requireAuth");
const { transactionsController } = require("../controllers/transactions.controller");

const router = Router();

// CAF-3
router.post("/transactions", requireAuth, transactionsController.create);

module.exports = router;

