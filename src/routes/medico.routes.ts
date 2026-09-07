import { Router } from "express";

import {
  getMedicos,
  getMedicoById,
  postMedico,
  putMedico,
  deleteMedico,
} from "../controllers/medico.controllers.js";

import { validate } from "../middlewares/validacion.general.js";
import { medicoSchema } from "../middlewares/validaciones.medico.js";
import { authorize } from "../middlewares/authorize.middleware.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.get(
  "/",
  verifyToken,
  authorize("RECEPCIONISTA", "MEDICO", "GERENCIA"),
  getMedicos,
); // #swagger.tags = ['Médicos']
// #swagger.security = [{ "bearerAuth": [] }]

router.get(
  "/:id",
  verifyToken,
  authorize("RECEPCIONISTA", "MEDICO", "GERENCIA"),
  getMedicoById,
); // #swagger.tags = ['Médicos']
// #swagger.security = [{ "bearerAuth": [] }]

router.post(
  "/",
  verifyToken,
  authorize("GERENCIA"),
  validate(medicoSchema),
  postMedico,
); // #swagger.tags = ['Médicos']
// #swagger.security = [{ "bearerAuth": [] }]

router.put(
  "/:id",
  verifyToken,
  authorize("GERENCIA"),
  validate(medicoSchema),
  putMedico,
); // #swagger.tags = ['Médicos']
// #swagger.security = [{ "bearerAuth": [] }]

router.delete("/:id", verifyToken, authorize("GERENCIA"), deleteMedico); // #swagger.tags = ['Médicos']
// #swagger.security = [{ "bearerAuth": [] }]
export default router;
