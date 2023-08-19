const catchAsync = require("../utils/catchAsync");

const Cart = require("../models/cartModel");
const Product = require("../models/productModel");
const AppError = require("../utils/appError");

exports.addItem = catchAsync(async (req, res, next) => {
  const { productId, quantity } = req.body;
  let product = await Product.findById(productId);

  // //User can only update their own cart
  // if (req.user._id !== userId) {
  //   return next(new AppError("Forbidden access", 401));
  // }
  if (!product || quantity > product.countInStock) {
    return next(
      new AppError("Only available product must be added to the cart", 400)
    );
  }
  console.log(req.user);
  let cart = await Cart.findOne({ user: req.user.id });

  if (!cart) {
    cart = await Cart.create({
      user: req.user._id,
      items: [],
    });
  }

  let existingItem = cart.items?.find((item) => item.product.equals(productId));
  // console.log(existingItem);
  if (existingItem) {
    existingItem.quantity += Number(quantity);
  } else {
    cart.items.push({
      product: productId,
      quantity: quantity,
    });
  }
  await cart.save();
  res.status(201).json({
    status: "success",
    cart,
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

//Remove product from cart
exports.deleteCartProduct = catchAsync(async (req, res, next) => {
  const productId = req.params.id;
  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    return next(new AppError("No cart found with this ID", 400));
  }

  cart.items = cart.items?.filter((item) => !item.product.equals(productId));
  await cart.save();

  res.status(200).json({
    status: "success",
    cart,
  });
});

//Update product in the cart
exports.updateCartProduct = catchAsync(async (req, res, next) => {
  const productId = req.params.id;
  const { quantity } = req.body;

  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    return next(new AppError("No cart found with this ID", 400));
  }

  let existingItem = cart.items?.find((item) => item.product.equals(productId));
  if (!existingItem) {
    return next(new AppError("Product do not exist in the Cart", 400));
  }
  existingItem.quantity += Number(quantity);
  await Cart.findByIdAndUpdate(cart._id, cart, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    cart,
  });
});
