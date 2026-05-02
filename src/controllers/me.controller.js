const authService = require("../services/auth.service");

const meController = {
  me: async (req, res, next) => {
    try {
      const userId = req.user?.sub;
      const user = await authService.getUserById(userId);
      return res.status(200).json(user.toJSON());
    } catch (err) {
      return next(err);
    }
  }
};

module.exports = { meController };

