const transactionsService = require("../services/transactions.service");

const summaryController = {
  get: async (req, res, next) => {
    try {
      const userId = req.user?.sub;
      const summary = await transactionsService.getSummary(userId);
      return res.status(200).json(summary);
    } catch (err) {
      return next(err);
    }
  }
};

module.exports = { summaryController };

