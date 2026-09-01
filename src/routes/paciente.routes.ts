import { Router } from "express";

import {
  getPacientes,
  getPacienteById,
  postPaciente,
} from "../controllers/paciente.controller";

const router = Router();

router.get("/", getPacientes);

router.get("/:id", getPacienteById);

router.post("/", postPaciente);

export default router;
