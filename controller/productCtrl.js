import asyncHandler from "express-async-handler";
import { getAllProducts, createProduct } from "../models/product.model.js";
import { sanitizeObject } from "../utils/sanitizer.js";



// CREATE
export const createProductController = async (req, res) => {
  // 1. Sanitization
  const data = sanitizeObject(req.body);

  // Behaviour business rule:
  if (data.price < 0) {
    return res.status(400).json({ error: "Price cannot be negative." });
  }

  // 2. Call model to validate 
  const product = createProduct(data);

  res.json({ message: "Product created", product });
};

// READ
export const getProduct = asyncHandler(async (req, res) => {
  res.json({ name: "Flip Flops 1" });
});


// READ
export function getAllProductsController(req, res) {
  try {
    const products = getAllProducts();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


// UPDATE
export const updateProduct = asyncHandler(async (req, res) => {
  res.json(`Updated product name:${req.body.title}`);
});

// DELETE
export const deleteProduct = asyncHandler(async (req, res) => {
  res.json(`Deleted product name:${req.body.title}`);
});
