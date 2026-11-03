import { Router } from "express";
import {
  register,
  login,
  updatePerfil,
} from "../controllers/auth.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { uploadFoto } from "../middlewares/upload.middleware.js";

const router: Router = Router();

router.post("/register", register);
router.post("/login", login);

router.put("/perfil", verifyToken, uploadFoto.single("foto"), updatePerfil);

export default router;
