import express from "express";
import { 
    createUser,
    getUser,
    getAllUsers,
    updateUser,
    deleteUser,
    loginUser,
    forgotPasswordUser,
    resetPasswordUser
} from '../controller/userCtrl.js';
import { authMiddleware, isAdmin } from '../middlewares/authMiddleware.js';


const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPasswordUser);
router.post("/reset-password/:token", resetPasswordUser);
router.get("/get-user", authMiddleware, getUser);
router.get('/get-all-users', getAllUsers);
router.put('/update-user/:id', updateUser);
router.delete('/delete-user/:email', deleteUser);

export default router;
