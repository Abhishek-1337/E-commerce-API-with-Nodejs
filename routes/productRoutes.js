const express = require("express");
const productController = require("../controllers/productController");
const router = express.Router();

router
  .route("/")
  .get(productController.getAllProduct)
  .post(productController.createProduct);

router.route("/:id").get(productController.getProduct);

module.exports = router;
