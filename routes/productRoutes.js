const express = require("express");

const {
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  getAllProducts,
} = require("../controllers/productController");

const { protected } = require("../controllers/authController");

const Route = express.Router();
// use protected routes
Route.post("/", protected, createProduct);
Route.get("/", getAllProducts);
Route.get("/:id", getProductById);
Route.put("/:id", protected, updateProduct);
Route.delete("/:id", protected, deleteProduct);

module.exports = Route;
