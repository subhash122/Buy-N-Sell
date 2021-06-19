const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const productRouter = require("../routes/productRoutes");
const productController = require("../controllers/productsController");
const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/logout", authController.logout);
router.get("/authorization", authController.isLoggedIn);
router.get("/me", authController.protect, userController.getMe);
router.patch("/updateMe", authController.protect, userController.updateMe);
router.patch(
  "/updatePassword",
  authController.protect,
  authController.updatePassword
);

router
  .route("/favourites")
  .get(authController.protect, userController.getAllFavourites)
  .post(authController.protect, userController.addToFavourites)
  .delete(authController.protect, userController.deleteFromFavourites);

router.use("/myAds", authController.protect, productRouter);

module.exports = router;
