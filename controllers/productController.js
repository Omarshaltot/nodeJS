// productController.js

const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");

exports.getAllProducts = asyncHandler(async (req, res) => {
  Product.find()

  const fil = new apiFilters(Product.find(), req.query).filter().page().sort()

  const productList = await fil.query;
})

/*exports.getAllProducts = asyncHandler(async(req, res) => {
  const queryObj = { ...req.query }
  const f = ["sort", "page", "limit"];
  f.forEach((el) => {
    delete queryObj[el];
  })
  let query = Product.find(queryObj);
  if(req.query.sort) {
    const sortBy = req.query.sort
    query = query.sort(sortBy)
  }

  if(req.query.fields) {
    const selectBy = req.query.fields.split(",").join(" ");
    query = query.select(selectBy);
  }

  const page = +req.query.page || 1;
  const limit = +req.query.limit || 10;
  const skip = (page - 1) * limit;
  query = query.skip(skip).limit(limit);

  // try {
    // const productList = await Product.find();
    // // is use soft delete
    // const features = new APIFeatures(
    //   Product.find({ isDeleted: false }),
    //   req.query
    
    // );

  const productList = await query;

    res.status(200).json({
      message: "success",
      length: productList.length,
      data: productList,
    });
  } /* catch (error) {
    console.error(error);
    res.status(500).json({ message: "fail", error: error.message }); */
  // }
/*});*/

// Create a product
exports.createProduct =asyncHandler( async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json({
      message: "success",
      data: newProduct,
    });
  } catch (error) {
    res.status(500).json({ message: "fail", error: error.message });
  }
});

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
