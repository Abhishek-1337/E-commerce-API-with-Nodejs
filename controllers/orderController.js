const catchAsync = require("../utils/catchAsync");
const Product = require("../models/productModel");
const AppError = require("../utils/appError");
const Order = require("../models/orderModel");
const Cart = require("../models/cartModel");
const User = require("../models/userModel");

exports.getOrder = catchAsync(async (req, res, next) => {
  const items = await Order.findOne({ user: req.user.id }).populate(
    "orderedItems"
  );

  if (!items) {
    return next(new AppError("No order with this ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      items,
    },
  });
});

exports.getAllOrder = catchAsync(async (req, res, next) => {
  const items = await Order.find();
  if (!items) {
    return res.status(200).json({
      status: "success",
      message: "No items found in history",
    });
  }

  res.status(200).json({
    status: "success",
    items,
  });
});

exports.placeOrder = catchAsync(async (req, res, next) => {
  // const { items } = req.body;
  const user = await User.findById(req.user._id);
  if (!user) {
    return next(
      new AppError("You are not logged in. Please login to place order", 401)
    );
  }
  const cart = await Cart.findOne({ user: req.user.id });

  if (!cart || cart.items.length == 0) {
    return next(new AppError("Cart is empty", 400));
  }

  let total = cart.items?.reduce(async (acc, item) => {
    const product = await Product.findById(item.product);
    return acc + product.price * item.quantity;
  }, 0);

  total = await total;
  const order = await Order.create({
    orderedItems: cart.items,
    total,
    shipping_address: user.shipping_address,
    payment_method: user.payment_method,
    user: req.user.id,
  });

  await Cart.findByIdAndDelete(cart._id);

  res.status(201).json({
    status: "success",
    order,
  });
});

// {
//     "items": [
//         { "product": "123", "quantity": 1}
//     ]
// }
