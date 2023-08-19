const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const authController = require("../controllers/authController");

router.use(authController.protect);

router.get("/", orderController.getAllOrder);
router.get("/:id", orderController.getOrder);
router.post("/place-order", orderController.placeOrder);

module.exports = router;
