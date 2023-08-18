const catchAsync = require("../utils/catchAsync");
const Category = require("../models/categoryModel");
const AppError = require("../utils/appError");

exports.getCategory = catchAsync(async (req, res, next) => {
  const category = await Category.find();
  if (category.length == 0) {
    return next(new AppError("Category is not available", 400));
  }
  res.status(200).json({
    status: "status",
    data: {
      category,
    },
  });
});

exports.createCategory = catchAsync(async (req, res, next) => {
  const category = await Category.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      category,
    },
  });
});
