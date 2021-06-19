const express = require("express");
const productController = require("../controllers/productsController");
const authController = require("../controllers/authController");

const router = express.Router();

router
  .route("/")
  .get(productController.getAll)
  .post(productController.uploadImage, productController.createProduct);

router
  .route("/:productId")
  .get(productController.getProduct)
  .patch(productController.updateProduct)
  .delete(productController.deleteProduct);

module.exports = router;
