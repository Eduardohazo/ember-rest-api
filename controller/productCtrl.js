import asyncHandler from "express-async-handler";

// CREATE
export const createProduct = asyncHandler(async (req, res) => {
  console.log(req.body);
  res.json(
    "Recieved a GET request with success to /api/product/create-product route!"
  );
});

// READ
export const getProduct = asyncHandler(async (req, res) => {
  res.json({name: "Flip Flops 1"});
});

export const getAllProducts = asyncHandler(async (req, res) => {
  res.json([{name: "Flip Flops 1"}, {name: "Flip Flops 2"}, {name: "Flip Flops 3"}]);
});

// UPDATE
export const updateProduct = asyncHandler(async (req, res) => {
  res.json(`Updated product name:${req.body.title}`);
});

// DELETE
export const deleteProduct = asyncHandler(async (req, res) => {
  res.json(`Deleted product name:${req.body.title}`);
});
