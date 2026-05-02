const mongoose = require("mongoose");
const { Transaction } = require("../models/Transaction");

function httpError(status, message) {
  const err = new Error(message);
  err.status = status;
  return err;
}

function parseISODateOnly(dateStr) {
  if (typeof dateStr !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    throw httpError(400, "date must be in YYYY-MM-DD format");
  }

  const d = new Date(`${dateStr}T00:00:00.000Z`);
  if (Number.isNaN(d.getTime())) throw httpError(400, "date is invalid");
  return d;
}

async function createTransaction(userId, { type, amount, description, date }) {
  if (!mongoose.isValidObjectId(userId)) throw httpError(401, "Unauthorized");
  if (type !== "income" && type !== "expense") throw httpError(400, "type must be income or expense");

  const num = Number(amount);
  if (!Number.isFinite(num) || num <= 0) throw httpError(400, "amount must be greater than zero");

  if (!description || String(description).trim().length === 0) throw httpError(400, "description is required");
  if (String(description).length > 255) throw httpError(400, "description must be at most 255 characters");

  const parsedDate = parseISODateOnly(date);

  const tx = await Transaction.create({
    userId,
    type,
    amount: num,
    description: String(description).trim(),
    date: parsedDate
  });

  return tx.toJSON();
}

async function getSummary(userId) {
  if (!mongoose.isValidObjectId(userId)) throw httpError(401, "Unauthorized");

  const rows = await Transaction.aggregate([
    { $match: { userId: new mongoose.Types.ObjectId(userId) } },
    { $group: { _id: "$type", total: { $sum: "$amount" } } }
  ]);

  const totals = rows.reduce(
    (acc, r) => {
      if (r._id === "income") acc.total_income = r.total;
      if (r._id === "expense") acc.total_expense = r.total;
      return acc;
    },
    { total_income: 0, total_expense: 0 }
  );

  return {
    total_income: totals.total_income,
    total_expense: totals.total_expense,
    balance: totals.total_income - totals.total_expense
  };
}

module.exports = { createTransaction, getSummary };

