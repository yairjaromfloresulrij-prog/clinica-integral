import { Router } from "express";

import {
  getEspecialidades,
  getEspecialidadById,
  postEspecialidades,
} from "../controllers/especialidades.controllers";
const router = Router();
router.get("/", getEspecialidades);
router.get("/:id", getEspecialidadById);
router.post("/", postEspecialidades);
export default router;
