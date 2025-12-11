import express from "express";
import { 
    createProductController,
    getProduct,
    getAllProductsController,
    updateProduct,
    deleteProduct
} from '../controller/productCtrl.js';

const router = express.Router();

router.post("/create-product", createProductController);
router.get('/get-product/:id', getProduct);
router.get('/get-all-products', getAllProductsController);
router.put('/update-product/:id', updateProduct);
router.delete('/delete-product/:id', deleteProduct);

export default router;
