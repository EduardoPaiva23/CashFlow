const authService = require("../services/auth.service");

function httpError(status, message) {
  const err = new Error(message);
  err.status = status;
  return err;
}

function validateCredentials({ name, email, password }, { requireName }) {
  if (requireName && !name) throw httpError(400, "name is required");
  if (!email) throw httpError(400, "email is required");
  // Basic format validation (CAF-1)
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email))) throw httpError(400, "email is invalid");
  if (!password) throw httpError(400, "password is required");
  if (String(password).length < 8) throw httpError(400, "password must be at least 8 characters");
}

const authController = {
  register: async (req, res, next) => {
    try {
      const { name, email, password } = req.body || {};
      validateCredentials({ name, email, password }, { requireName: true });
      const result = await authService.register({ name, email, password });
      return res.status(201).json(result);
    } catch (err) {
      return next(err);
    }
  },

  login: async (req, res, next) => {
    try {
      const { email, password } = req.body || {};
      validateCredentials({ email, password }, { requireName: false });
      const result = await authService.login({ email, password });
      return res.status(200).json(result);
    } catch (err) {
      return next(err);
    }
  }
};

module.exports = { authController };

