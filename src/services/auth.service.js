const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models/User");
const { env } = require("../config/env");

function httpError(status, message) {
  const err = new Error(message);
  err.status = status;
  return err;
}

function signToken(user) {
  return jwt.sign({ sub: String(user._id) }, env.jwtSecret, { expiresIn: env.jwtExpiresIn });
}

async function register({ name, email, password }) {
  const existing = await User.findOne({ email }).lean();
  if (existing) throw httpError(409, "Email already in use");

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, passwordHash });
  const token = signToken(user);
  return { token, user: user.toJSON() };
}

async function login({ email, password }) {
  const user = await User.findOne({ email }).select("+passwordHash");
  if (!user) throw httpError(401, "Invalid credentials");

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) throw httpError(401, "Invalid credentials");

  const token = signToken(user);
  return { token, user: user.toJSON() };
}

async function getUserById(id) {
  const user = await User.findById(id);
  if (!user) throw httpError(404, "User not found");
  return user;
}

module.exports = { register, login, getUserById };

