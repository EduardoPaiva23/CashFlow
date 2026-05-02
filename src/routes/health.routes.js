const { Router } = require("express");

const router = Router();

router.get("/health", (_req, res) => {
  res.json({ ok: true, service: "cashflow-api" });
});

module.exports = router;

