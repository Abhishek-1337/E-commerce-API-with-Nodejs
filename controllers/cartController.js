const catchAsync = require("../utils/catchAsync");

const Cart = require("../models/cartModel");
const Product = require("../models/productModel");
const AppError = require("../utils/appError");

exports.addItem = catchAsync(async (req, res, next) => {
  const { productId, quantity } = req.body;
  const product = await Product.findById(productId);

  if (!product || product.countInStock == 0) {
    return next(
      new AppError("Only available product must be added to the cart", 400)
    );
  }

  let existingItem = await Cart.findOne({ product: productId });
  if (existingItem) {
    existingItem.quantity += Number(quantity);
  } else {
    existingItem = await Cart.create({
      product: productId,
      quantity: quantity,
    });
  }

  res.status(201).json({
    status: "success",
    data: {
      item: existingItem,
    },
  });
});

exports.viewCart = catchAsync(async (req, res, next) => {
  const items = await Cart.find();

  if (items.length == 0) {
    return res.status(200).json({
      status: "success",
      message: "Cart is empty",
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      items,
    },
  });
});
