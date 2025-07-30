// productModel.js

const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Product must have a title"],
      unique: true,
      minlength: [2, "Title must be at least 2 characters"],
      maxlength: [100, "Title must be less than 100 characters"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Product must have a price"],
      min: [0, "Price must be at least 0"],
    },
    description: String,

    rating: { type: Number, default: 1.0 },
    stock: { type: Number, default: 0 },
    isFeatured: { type: Boolean, default: false },
    discount: { type: Number, min: 0, max: 100, default: 0 },

    status: {
      type: String,
      enum: ["available", "out of stock", "discontinued"],
      default: "available",
    },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Product = new mongoose.model("Product", productSchema);

module.exports = Product;

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODhhNjY4NjBjMDFiYjdjNTE3NDBmNDQiLCJpYXQiOjE3NTM5MDA2NzgsImV4cCI6MTc1NDc2NDY3OH0.P7cVpranl4MRXEuxUMyfb11Qjpo6gmL2i0wqwdrybsc