const transactionsService = require("../services/transactions.service");

const transactionsController = {
  create: async (req, res, next) => {
    try {
      const userId = req.user?.sub;
      const result = await transactionsService.createTransaction(userId, req.body || {});
      return res.status(201).json(result);
    } catch (err) {
      return next(err);
    }
  }
};

module.exports = { transactionsController };

