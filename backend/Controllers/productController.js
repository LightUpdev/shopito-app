import asyncHandler from "express-async-handler";
import Product from "../Models/ProductModel.js";
import { generateSKU } from "../utils/index.js";

// create products
const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    color,
    price,
    regularPrice,
    description,
    category,
    brand,
    image,
  } = req.body;

  const sku = generateSKU(name, category);

  if (!name || !description || !price || !regularPrice || !category || !brand) {
    res.status(400);
    res.send("Please fill in required fields");
  }
  try {
    const product = await Product.create({
      name,
      color,
      price,
      sku,
      regularPrice,
      description,
      category,
      brand,
      image,
    });

    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// get all products
const getProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find().sort("-createdAt");
    if (products) {
      res.status(200).json(products);
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  } catch (error) {
    console.error(error.message);
  }
});

// get product by id
const getSingleProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

// delete product
const deleteProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404);
      throw new Error("Product not found.");
    }
    await product.remove();
    res.status(200).json("Product deleted successfully");
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

// update product
const updateProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404);
      throw new Error("Product not found.");
    }

    // updated product
    const updatingProduct = await Product.findByIdAndUpdate(
      product?._id,
      {
        name: req.body.name || product.name,
        color: req.body.color || product.color,
        price: req.body.price || product.price,
        regularPrice: req.body.regularPrice || product.regularPrice,
        description: req.body.description || product.description,
        category: req.body.category || product.category,
        brand: req.body.brand || product.brand,
        image: req.body.image || product.image,
      },
      { new: true, runValidators: true }
    );
    res.status(200).json(updatingProduct);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

export {
  createProduct,
  getProducts,
  deleteProduct,
  getSingleProduct,
  updateProduct,
};
