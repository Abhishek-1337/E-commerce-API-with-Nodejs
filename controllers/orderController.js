const catchAsync = require("../utils/catchAsync");
const Product = require("../models/productModel");
const AppError = require("../utils/appError");
const Order = require("../models/orderModel");
const Cart = require("../models/cartModel");

exports.getOrder = catchAsync(async (req, res, next) => {
  const items = await Order.findById(req.params.id).populate("orderedItems");

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
  const { items } = req.body;

  let totalPrice = 0;
  let products = [];
  for (let item of items) {
    console.log(item);
    let product = await Product.findById(item.product);
    // console.log(product);
    if (!product) {
      return next(new AppError("Product not found", 404));
    }
    products.push({
      product: product._id,
      quantity: item.quantity,
    });
    totalPrice += product.price * item.quantity;

    const deletedItem = await Cart.findOneAndDelete({ product: item.product });
    // console.log(deletedItem);
  }

  const order = await Order.create({
    orderedItems: products,
    total: totalPrice,
  });

  res.status(201).json({
    status: "success",
    data: {
      order,
    },
  });
});

// {
//     "items": [
//         { "product": "123", "quantity": 1}
//     ]
// }
