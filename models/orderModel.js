const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  orderedItems: [
    {
      product: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  total: {
    type: Number,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
