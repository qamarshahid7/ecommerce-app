const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProductById,
  createProduct,
  deleteProduct,
} = require("../controllers/productController");
const { protect, admin } = require("../middleware/authMiddleware");
const { upload } = require("../config/cloudinary");

router
  .route("/")
  .get(getProducts)
  .post(protect, admin, upload.single("image"), createProduct);
router.route("/:id").get(getProductById).delete(protect, admin, deleteProduct);

module.exports = router;
