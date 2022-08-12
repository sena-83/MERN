const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
  userId: { type: String },
  email: {
    type: String,
  },
  guest: {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
  },
  shippingAddress: {
    street: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    zip: {
      type: Number,
    },
  },
  cart: [{ productId: { type: Number }, quantity: { type: Number } }],
  orderPlacedOn: {
    type: Date,
    default: Date.now(),
  },
  orderDeliveredOn: {
    type: Date,
  },
  isDelivered: {
    type: Boolean,
    default: false,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("order", OrderSchema);
