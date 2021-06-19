const mongoose = require("mongoose");
const User = require("./userModel");
const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product must have a name"],
  },
  description: {
    type: String,
    required: [true, "Product must have a description"],
  },
  details: {
    type: Map,
  },
  price: {
    type: Number,
    required: [true, "Product must have a price"],
  },
  images: [{ type: String }],
  seller: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  category: {
    type: String,
    required: [true, "please select a category"],
  },
  active: {
    type: Boolean,
  },
});

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
