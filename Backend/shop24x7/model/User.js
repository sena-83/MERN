const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdminRole: {
    type: Boolean,
    default: false,
  },
  profileImage: {
    type: String,
  },
  address: {
    streetAddress: { type: String },
    city: { type: String },
    state: { type: String },
    zipcode: { type: String },
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("user", UserSchema);
