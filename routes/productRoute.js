import express from "express";
import { 
    createProduct,
    getProduct,
    getAllProductsController,
    updateProduct,
    deleteProduct
} from '../controller/productCtrl.js';

const router = express.Router();

router.post("/create-product", createProduct);
router.get('/get-product/:id', getProduct);
router.get('/get-all-products', getAllProductsController);
router.put('/update-product/:id', updateProduct);
router.delete('/delete-product/:id', deleteProduct);

export default router;
