const express = require("express");

const {
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  getAllProducts,
} = require("../controllers/productController");

const Route = express.Router();

Route.post("/", createProduct);
Route.get("/", getAllProducts);
Route.get("/:id", getProductById);
Route.put("/:id", updateProduct);
Route.delete("/:id", deleteProduct);

module.exports = Route;
