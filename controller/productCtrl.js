import asyncHandler from "express-async-handler";
import { getAllProducts, createProduct } from "../models/product.model.js";
import { sanitizeObject } from "../utils/sanitizer.js";

// CREATE
export const createProductController = async (req, res) => {
  // TODO: is all done but not admin UI
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
export const getProductController = (req, res) => {
  try {
    const id = req.params.id;

    // Get all products
    const products = getAllProducts();

    // Find the product
    const product = products.find((p) => {
      return p.id_product.toString() === id.toString();
    });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

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
  // TODO
  res.json(`Updated product name:${req.body.title}`);
});

// DELETE
export const deleteProduct = asyncHandler(async (req, res) => {
  // TODO
  res.json(`Deleted product name:${req.body.title}`);
});
