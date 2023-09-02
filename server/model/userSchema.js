const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validation: {
      validate: function (userEmail) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userEmail);
      },
      message: `Enter the a valid email`,
    },
  },
  password: {
    type: String,
    required: true,
  },
  createdOn: {
    date: Date,
  },
  userName: {
    required: true,
    type: String,
  },
  token: {
    type: String,
  },
});
module.exports = mongoose.model("Forum-User", userSchema);
