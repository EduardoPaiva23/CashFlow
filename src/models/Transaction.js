const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, index: true, ref: "User" },
    type: { type: String, required: true, enum: ["income", "expense"], index: true },
    amount: { type: Number, required: true, min: 0 },
    description: { type: String, required: true, maxlength: 255, trim: true },
    date: { type: Date, required: true, index: true }
  },
  { timestamps: true }
);

transactionSchema.methods.toJSON = function toJSON() {
  const obj = this.toObject({ virtuals: false });
  obj.id = String(obj._id);
  delete obj._id;
  delete obj.__v;
  return obj;
};

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = { Transaction };

