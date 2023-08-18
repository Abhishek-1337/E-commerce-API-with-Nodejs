const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
  product: {
    type: mongoose.Schema.ObjectId,
    ref: "Product",
  },
  quantity: {
    type: Number,
    required: [true, "Product quantity must be provided"],
  },
});

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
