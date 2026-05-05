jest.mock("../models/Transaction", () => ({
  Transaction: {
    create: jest.fn(),
    aggregate: jest.fn()
  }
}));

const { Transaction } = require("../models/Transaction");
const transactionsService = require("../services/transactions.service");

describe("transactions.service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("createTransaction rejects invalid type", async () => {
    await expect(
      transactionsService.createTransaction("507f1f77bcf86cd799439011", {
        type: "other",
        amount: 10,
        description: "x",
        date: "2026-05-02"
      })
    ).rejects.toMatchObject({ status: 400 });
  });

  test("createTransaction rejects non-positive amount", async () => {
    await expect(
      transactionsService.createTransaction("507f1f77bcf86cd799439011", {
        type: "income",
        amount: 0,
        description: "x",
        date: "2026-05-02"
      })
    ).rejects.toMatchObject({ status: 400 });
  });

  test("createTransaction rejects invalid date format", async () => {
    await expect(
      transactionsService.createTransaction("507f1f77bcf86cd799439011", {
        type: "income",
        amount: 10,
        description: "x",
        date: "02-05-2026"
      })
    ).rejects.toMatchObject({ status: 400 });
  });

  test("createTransaction creates transaction and returns json", async () => {
    const txDoc = { toJSON: () => ({ id: "t1" }) };
    Transaction.create.mockResolvedValue(txDoc);

    const result = await transactionsService.createTransaction("507f1f77bcf86cd799439011", {
      type: "expense",
      amount: 12.5,
      description: "Coffee",
      date: "2026-05-02"
    });

    expect(Transaction.create).toHaveBeenCalled();
    expect(result).toEqual({ id: "t1" });
  });

  test("getSummary returns zeros when no rows", async () => {
    Transaction.aggregate.mockResolvedValue([]);

    const result = await transactionsService.getSummary("507f1f77bcf86cd799439011");
    expect(result).toEqual({ total_income: 0, total_expense: 0, balance: 0 });
  });

  test("getSummary computes totals and balance", async () => {
    Transaction.aggregate.mockResolvedValue([
      { _id: "income", total: 100 },
      { _id: "expense", total: 40 }
    ]);

    const result = await transactionsService.getSummary("507f1f77bcf86cd799439011");
    expect(result).toEqual({ total_income: 100, total_expense: 40, balance: 60 });
  });
});

