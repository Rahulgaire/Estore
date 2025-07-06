const {
  addProduct,
  getAllProduct,
  getOneProduct,
  deleteSingleProduct,
  updateProduct,
  deleteAllProduct,
} = require("../controllers/Product.controllers");
const uploadSingleImage = require("../middleware/Upload.middleware");

const express = require("express");
const productRouter = express.Router();
const authenticated = require("../middleware/headers");

productRouter.post("/product",authenticated,uploadSingleImage("image"),addProduct);
productRouter.get("/product",getAllProduct);
productRouter.get("/product/:id", getOneProduct);
productRouter.delete("/product", deleteAllProduct);
productRouter.delete("/product/:id", deleteSingleProduct);
productRouter.put("/product/:id", uploadSingleImage("image"), updateProduct);

module.exports = productRouter;
