import fs from "fs";

// TODO: This is a provitional file | Must implement a real DB
const usersFile = "./json_dbs/users.json";
// For SSG
const productsFile = "./json_dbs/products.json";
// For Postman 
// const productsFile = "./json_dbs/products_copy_for_postman";


// Users
export const readUsers = () => {
  const data = fs.readFileSync(usersFile, "utf-8");
  return JSON.parse(data);
};

export const writeUsers = (users) => {
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
};

// Products
export const readProducts = () => {
  const data = fs.readFileSync(productsFile, "utf-8");
  return JSON.parse(data);
};

export const writeProducts = (products) => {
  fs.writeFileSync(productsFile, JSON.stringify(products, null, 2));
};



