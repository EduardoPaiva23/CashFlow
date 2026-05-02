const { Router } = require("express");
const healthRoutes = require("./health.routes");
const authRoutes = require("./auth.routes");
const meRoutes = require("./me.routes");

const router = Router();

router.use(healthRoutes);
router.use("/auth", authRoutes);
router.use(meRoutes);

module.exports = router;

