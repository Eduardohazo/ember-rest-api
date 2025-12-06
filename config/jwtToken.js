import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

const SECRET = process.env.SECRET; // Use env variable in production

export const generateToken = (id) => {
  return jwt.sign({ id }, SECRET, { expiresIn: "1h" });
};
