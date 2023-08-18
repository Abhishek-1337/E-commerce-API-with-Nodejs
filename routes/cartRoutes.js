const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

router.get("/", cartController.viewCart);
router.route("/add-to-cart").post(cartController.addItem);

module.exports = router;
