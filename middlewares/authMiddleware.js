import asyncHandler from "express-async-handler";

export const authMiddleware = asyncHandler(async (req, res, next) => {
  let token;
  // TODO: authentify user
  console.log("Inside authMiddleware!");
  next();
});

export const isAdmin = asyncHandler(async (req, res, next) => {
  // TODO: check if its admin
  console.log("Inside isAdmin!");
  next();
});
