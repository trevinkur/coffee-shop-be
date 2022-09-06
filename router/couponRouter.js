const express = require("express");
const router = express.Router();
const couponController = require("../controller/couponController");
const upload = require("../helper/upload");
const verifyAuth = require("../helper/verifyAuth");

router.get("/", couponController.getCoupon);
router.get("/:code", couponController.getCouponByCode);
router.post('/',  couponController.addCoupon)

module.exports = router;