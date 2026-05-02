jest.mock("../models/User", () => ({
  User: {
    findOne: jest.fn(),
    create: jest.fn(),
    findById: jest.fn()
  }
}));

jest.mock("bcryptjs", () => ({
  hash: jest.fn(),
  compare: jest.fn()
}));

jest.mock("jsonwebtoken", () => ({
  sign: jest.fn(() => "jwt-token")
}));

jest.mock("../config/env", () => ({
  env: { jwtSecret: "secret", jwtExpiresIn: "1h" }
}));

const bcrypt = require("bcryptjs");
const { User } = require("../models/User");
const authService = require("../services/auth.service");

describe("auth.service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("register throws 409 when email already exists", async () => {
    User.findOne.mockReturnValue({ lean: jest.fn().mockResolvedValue({ _id: "existing" }) });

    await expect(authService.register({ name: "A", email: "a@a.com", password: "12345678" })).rejects.toMatchObject({
      status: 409
    });
  });

  test("register hashes password, creates user and returns token + user", async () => {
    User.findOne.mockReturnValue({ lean: jest.fn().mockResolvedValue(null) });
    bcrypt.hash.mockResolvedValue("hash");
    const userDoc = { _id: "u1", toJSON: () => ({ id: "u1", email: "a@a.com", name: "A" }) };
    User.create.mockResolvedValue(userDoc);

    const result = await authService.register({ name: "A", email: "a@a.com", password: "12345678" });

    expect(bcrypt.hash).toHaveBeenCalledWith("12345678", 10);
    expect(User.create).toHaveBeenCalledWith({ name: "A", email: "a@a.com", passwordHash: "hash" });
    expect(result).toEqual({ token: "jwt-token", user: { id: "u1", email: "a@a.com", name: "A" } });
  });

  test("login throws 401 for non-existing user", async () => {
    User.findOne.mockReturnValue({ select: jest.fn().mockResolvedValue(null) });

    await expect(authService.login({ email: "a@a.com", password: "x" })).rejects.toMatchObject({ status: 401 });
  });

  test("login throws 401 for wrong password", async () => {
    const userDoc = { _id: "u1", passwordHash: "hash", toJSON: () => ({ id: "u1" }) };
    User.findOne.mockReturnValue({ select: jest.fn().mockResolvedValue(userDoc) });
    bcrypt.compare.mockResolvedValue(false);

    await expect(authService.login({ email: "a@a.com", password: "bad" })).rejects.toMatchObject({ status: 401 });
  });

  test("login returns token + user for correct password", async () => {
    const userDoc = { _id: "u1", passwordHash: "hash", toJSON: () => ({ id: "u1" }) };
    User.findOne.mockReturnValue({ select: jest.fn().mockResolvedValue(userDoc) });
    bcrypt.compare.mockResolvedValue(true);

    const result = await authService.login({ email: "a@a.com", password: "ok" });
    expect(result).toEqual({ token: "jwt-token", user: { id: "u1" } });
  });
});

