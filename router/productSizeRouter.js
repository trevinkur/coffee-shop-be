const express = require("express");
const productSizeController = require("../controller/productSizeController");
const router = express();

router.get("/", productSizeController.getSize);
router.post("/", productSizeController.addSize);

module.exports = router