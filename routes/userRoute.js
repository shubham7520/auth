import express from "express";
const router = express.Router();
import { register, login, profile } from "../controllers/UserController.js";
import authMiddelware from "../middleware/authMiddleware.js";




router.post('/register', register)
router.post('/login', login)
router.get('/profile', authMiddelware, profile);

export default router
