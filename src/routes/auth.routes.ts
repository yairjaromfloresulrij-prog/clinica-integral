import { Router } from "express";
import { register, login } from "../controllers/auth.controller.js";

const router = Router();

router.post("/register", register); // #swagger.tags = ['Autenticación']
router.post("/login", login); // #swagger.tags = ['Autenticación']
export default router;
