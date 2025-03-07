const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },

    isAdmin: Boolean,
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
