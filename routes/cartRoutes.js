const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

router.get("/", cartController.viewCart);
router.route("/add-to-cart").post(cartController.addItem);
router
  .route("/:id")
  .delete(cartController.deleteProduct)
  .patch(cartController.updateProduct);

module.exports = router;
