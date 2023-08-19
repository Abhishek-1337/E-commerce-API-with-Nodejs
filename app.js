const express = require("express");
const morgan = require("morgan");
// const rateLimit = require("express-rate-limit");
const globalErrorHandler = require("./controllers/errorController");
const categoryRouter = require("./routes/categoryRoutes");
const productRouter = require("./routes/productRoutes");
const cartRouter = require("./routes/cartRoutes");
const orderRouter = require("./routes/orderRoute");
const userRouter = require("./routes/userRoutes");
const { rateLimit } = require("express-rate-limit");

const app = express();

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many request from this IP. Please try again in an hour",
});

app.use("/api", limiter);

app.use(morgan("dev"));
app.use(express.json());

app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/products", productRouter);

app.use(globalErrorHandler);

module.exports = app;
