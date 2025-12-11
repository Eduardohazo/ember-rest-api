// TODO: define model | still doesnt align with json data base objects
import { ProductSchema } from "../schemas/product.schema.js";
import { readProducts, writeProducts } from "../utils/json.js";


export function createProduct(rawData) {
  // 1. Validation + Structure buisness logic
  const data = ProductSchema.parse(rawData); 

  // 2. Persistance
  const products = readProducts();
  products.push(data);
  writeProducts(products);

  return data;
}

export function getAllProducts() {
  // 1 Read products from JSON
  const products = readProducts();

  // validate using schema
  const parsed = ProductSchema.array().safeParse(products);

  if (!parsed.success) {
    console.error(parsed.error);
    throw new Error("Invalid product data in JSON database");
  }

  return parsed.data;
}

// TODO: Change to posgress later and uncomment this code
// // future version (PostgreSQL + Prisma)
// export async function getAllProducts() {
//   return prisma.product.findMany();
// }
