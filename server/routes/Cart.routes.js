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
cartRoute.post("/remove-from-cart", authenticated, removeFromCart);
cartRoute.post("/update-cart", authenticated, updateQuantity);
cartRoute.post("/get-cart", authenticated, getCartDetails);

module.exports = cartRoute;
