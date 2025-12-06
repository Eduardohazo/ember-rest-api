import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import { User } from "../models/userModel.js";
import { readUsers, writeUsers } from "../utils/json.js";
import { generateToken } from "../config/jwtToken.js";
import crypto from "crypto";

// CREATE
export const createUser = asyncHandler(async (req, res) => {
  const users = readUsers();
  const { firstname, lastname, email, mobile, password } = req.body;

  // Check if user already exists
  const exist = users.find((u) => u.email === email);
  if (exist) return res.status(400).json({ message: "User already exists" });

  // Create new user
  const id = Date.now();
  const newUser = new User({
    id,
    firstname,
    lastname,
    email,
    mobile,
    password,
  });
  await newUser.hashPassword();

  users.push(newUser);
  writeUsers(users);

  // Generate JWT token
  const token = generateToken(newUser.id);

  res.status(201).json({ user: newUser, token });
});

// READ
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log(email);

  // 1 Read users from JSON
  const users = readUsers();

  // 2️ Find user by email
  const user = users.find((u) => u.email === email);
  if (!user)
    return res.status(400).json({ message: "Invalid email or password" });

  // 3️ Compare passwords
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch)
    return res.status(400).json({ message: "Invalid email or password" });

  // 4 Generate JWT token
  const token = generateToken(user.id);

  // 5️ Return user info + token (avoid sending password)
  res.json({
    user: {
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      mobile: user.mobile,
    },
    token,
  });
});

// READ
export const getUser = asyncHandler(async (req, res) => {
  res.json({ name: "Jon Doe" });
});

// READ
export const getAllUsers = asyncHandler(async (req, res) => {
  res.json([
    { name: "Jon Doe" },
    { name: "James Jean" },
    { name: "Rick Bell" },
  ]);
});

// UPDATE
export const updateUser = asyncHandler(async (req, res) => {
  res.json(`Updated user name:${req.body.name}`);
});

// DELETE
export const deleteUser = asyncHandler(async (req, res) => {
  res.json(`Deleted user name:${req.body.name}`);
});

// POST
// Step 1: Generate reset token (forgot password)
export const forgotPasswordUser = asyncHandler((req, res) => {
  const { email } = req.body;
  const users = readUsers();
  const user = users.find(u => u.email === email);
  console.log(user);
  if (!user) return res.status(404).json({ message: "User not found" });

  // Generate random token
  const token = crypto.randomBytes(32).toString("hex");
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  // Save hashed token + expiry in user JSON
  user.resetToken = hashedToken;
  user.resetTokenExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

  writeUsers(users);

  // In real app → send email with this token
  // For now → just return it in response
  res.json({
    message: "Reset token generated. Use this token to reset password.",
    token
  });
});

// POST
// Step 2: Reset password
export const resetPasswordUser = asyncHandler(async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  const users = readUsers();
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  // Find user with matching token & not expired
  const user = users.find(u => u.resetToken === hashedToken && u.resetTokenExpires > Date.now());
  if (!user) return res.status(400).json({ message: "Invalid or expired token" });

  // Hash new password
  const salt = await bcrypt.genSalt(10);
  // Asign new password
  user.password = await bcrypt.hash(newPassword, salt);

  // Remove reset token & expiry
  delete user.resetToken;
  delete user.resetTokenExpires;

  writeUsers(users);

  res.json({ message: "Password successfully reset!" });
});