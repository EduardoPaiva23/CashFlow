const { Router } = require("express");
const healthRoutes = require("./health.routes");
const usersRoutes = require("./users.routes");
const sessionsRoutes = require("./sessions.routes");
const meRoutes = require("./me.routes");
const transactionsRoutes = require("./transactions.routes");
const summaryRoutes = require("./summary.routes");

const router = Router();

router.use(healthRoutes);
router.use(usersRoutes);
router.use(sessionsRoutes);
router.use(meRoutes);
router.use(transactionsRoutes);
router.use(summaryRoutes);

module.exports = router;

