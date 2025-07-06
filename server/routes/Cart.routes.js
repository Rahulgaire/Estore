const {
  addToCart,
  removeFromCart,
  updateQuantity,
  getCartDetails,
} = require("../controllers/Cart.controllers");
const express = require("express");
const authenticated = require("../middleware/headers");
const cartRoute = express.Router();

cartRoute.post("/add-to-cart", authenticated, addToCart);
cartRoute.delete("/remove-from-cart/:id", authenticated, removeFromCart);
cartRoute.patch("/update-cart", authenticated, updateQuantity);
cartRoute.get("/get-cart", authenticated, getCartDetails);

module.exports = cartRoute;
