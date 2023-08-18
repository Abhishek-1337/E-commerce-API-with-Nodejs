const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Missing name value"],
    unique: true,
  },
  description: {
    type: String,
    required: [true, "Product description is empty"],
  },
  price: {
    type: Number,
    required: [true, "Missing price value"],
  },
  countInStock: {
    type: Number,
    required: true,
  },
  category: {
    type: mongoose.Schema.ObjectId,
    ref: "Category",
  },
});

productSchema.pre(/^find/, function (next) {
  this.populate({
    path: "category",
    select: "-__v",
  });
  next();
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
