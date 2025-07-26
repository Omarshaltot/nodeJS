const Product = require("../models/productModel");

exports.getAllProducts = async (req, res) => {
  try {
    const productList = await Product.find();
    // is use soft delete
    // const features = new APIFeatures(
    //   Product.find({ isDeleted: false }),
    //   req.query
    
    // );

    res.status(200).json({
      message: "success",
      length: productList.length,
      data: productList,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "fail", error: error.message });
  }
};

// Create a product
exports.createProduct = async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json({
      message: "success",
      data: newProduct,
    });
  } catch (error) {
    res.status(500).json({ message: "fail", error: error.message });
  }
};

// Get product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "success",
      data: product,
    });
  } catch (error) {
    res.status(500).json({ message: "fail", error: error.message });
  }
};

// Update product
exports.updateProduct = async (req, res) => {
  try {
    const updateProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updateProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "success",
      data: updateProduct,
    });
  } catch (error) {
    res.status(500).json({ message: "fail", error: error.message });
  }
};

// Delete product
exports.deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "fail", error: error.message });
  }
};

// Basic validation middleware
exports.validateProduct = (req, res, next) => {
  const { title, price } = req.body;
  if (!title || !price) {
    return res.status(400).json({
      status: "fail",
      message: "Missing required fields: title and/or price",
    });
  }
  next();
};
