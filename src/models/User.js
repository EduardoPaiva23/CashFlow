const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    passwordHash: { type: String, required: true, select: false }
  },
  { timestamps: true }
);

userSchema.methods.toJSON = function toJSON() {
  const obj = this.toObject({ virtuals: false });
  obj.id = String(obj._id);
  delete obj._id;
  delete obj.__v;
  delete obj.passwordHash;
  return obj;
};

const User = mongoose.model("User", userSchema);

module.exports = { User };

