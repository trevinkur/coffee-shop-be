const express = require("express");
const router = express.Router();
const ordersController = require("../controller/ordersController");
const upload = require("../helper/upload")

router.get("/:user_id", ordersController.getOrdersByUser);
router.post('/', ordersController.addOrders);
router.patch('/', ordersController.updateOrders);
router.patch("/delete", ordersController.softDeleteOrders);

module.exports = router;