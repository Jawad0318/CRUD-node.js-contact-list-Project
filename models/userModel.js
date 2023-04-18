const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'please add the user name'],
    },
    email: {
      type: String,
      required: [true, 'please enter the user email'],
      unique: [true, 'already exist'],
    },
    password: {
      type: String,
      required: [true, 'please add the password'],
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model('User', userSchema);
