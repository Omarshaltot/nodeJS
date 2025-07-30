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
Route.post("/", permission('admin'), protect, createProduct);
Route.get("/", getAllProducts);
Route.get("/:id", getProductById);
Route.put("/:id", permission('admin'), protect, updateProduct);
Route.delete("/:id", permission('admin'), protect, deleteProduct);

module.exports = Route;
