const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const authController = require("../controllers/authController");

router.use(authController.protect);

router.get("/", cartController.viewCart);
router.route("/add-to-cart").post(cartController.addItem);
router
  .route("/:id")
  .delete(cartController.deleteCartProduct)
  .patch(cartController.updateCartProduct);

module.exports = router;
