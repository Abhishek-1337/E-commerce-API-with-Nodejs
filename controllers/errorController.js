const AppError = require("../utils/appError");

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path} : ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const val = err.keyValue.name;
  const message = `Duplicate field value : ${val}. Please use another value!`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((val) => {
    return Object.values(val)[0].message;
  });
  const message = `Invalid input data :  ${errors.join(". ")}`; //
  return new AppError(message, 400);
};

const sendErrorDev = (err, req, res) => {
  // if (req.originalUrl.startsWith("/api")) {
  //A) This will be shown in case of error while using api
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
  // }

  //B) This will be used when rendering pages in browser
  // console.log("ERROR :(", err);
  // return res.status(err.statusCode).render("error", {
  //   title: "Something went wrong",
  //   msg: err.message,
  // });
};

const handleJsonWebTokenErrorDB = (err) => {
  const message = "Invalid token";
  return new AppError(message, 401);
};

const handleTokenExpiredErrorDB = (err) => {
  const message = "Token expired";
  return new AppError(message, 401);
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  // if (err.code === 11000) error = handleDuplicateFieldsDB(erro);
  sendErrorDev(err, req, res);

  // let error = { ...err };
  // error.message = err.message;
  // if (err.name === "CastError") error = handleCastErrorDB(error);
  // if (err.name === "ValidationError") error = handleValidationErrorDB(error);
  // if (err.name === "JsonWebTokenError")
  //   error = handleJsonWebTokenErrorDB(error);
  // if (err.name === "TokenExpiredError")
  //   error = handleTokenExpiredErrorDB(error);
};
