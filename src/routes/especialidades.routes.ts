import { Router } from "express";
import {
  getEspecialidades,
  postEspecialidades,
} from "../controllers/especialidades.controllers";

const router = Router();

router.get("/", getEspecialidades);
router.post("/", postEspecialidades);
export default router;
