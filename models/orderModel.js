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
  payment_method: {
    type: String,
    required: [true, "Payment method is not defined"],
  },
  shipping_address: {
    type: String,
    required: [true, "Shipping address is missing"],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
});

// orderSchema.pre(/^find/, function (next) {
//   this.orderedItems.populate({
//     path: "Product",
//   });
//   next();
// });

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
