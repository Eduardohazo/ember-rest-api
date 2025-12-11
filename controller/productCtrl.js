import asyncHandler from "express-async-handler";
import { getAllProducts } from "../models/product.model.js";


// CREATE
export const createProduct = asyncHandler(async (req, res) => {
  console.log(req.body);
  res.json(
    "Recived a GET request with success to /api/product/create-product route!"
  );
});

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
