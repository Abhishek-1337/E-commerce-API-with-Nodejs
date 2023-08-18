const express = require("express");
const morgan = require("morgan");
const globalErrorHandler = require("./controllers/errorController");
const categoryRouter = require("./routes/categoryRoutes");
const productRouter = require("./routes/productRoutes");
const cartRouter = require("./routes/cartRoutes");

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/products", productRouter);

app.use(globalErrorHandler);

module.exports = app;
