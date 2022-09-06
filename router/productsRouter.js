const express = require("express");
const router = express.Router();
const productsController = require("../controller/productsController");
const upload = require("../helper/upload");
const verifyAuth = require("../helper/verifyAuth");

router.get("/", productsController.getProducts);
router.get("/:slug", productsController.getProductBySlug);
router.post('/',  upload.single("cover"), productsController.addProduct)

module.exports = router;