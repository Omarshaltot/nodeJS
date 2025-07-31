// productRoutes.js

const express = require("express");

const {
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  getAllProducts,
} = require("../controllers/productController"); 

const {protect, permission} = require("../controllers/authController");
// const { permission } = require("process");

const Route = express.Router();
// use protected routes
Route.post("/", protect, permission('admin'), createProduct);
Route.get("/", getAllProducts);
Route.get("/:id", getProductById);
Route.put("/:id", protect, permission('admin'), updateProduct);
Route.delete("/:id", protect, permission('admin'), deleteProduct);

module.exports = Route;
