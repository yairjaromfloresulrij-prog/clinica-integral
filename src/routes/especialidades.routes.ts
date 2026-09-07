import { Router } from "express";
import {
  getEspecialidades,
  getEspecialidadById,
  postEspecialidades,
  putEspecialidad,
  deleteEspecialidad,
} from "../controllers/especialidades.controllers";
import { validate } from "../middlewares/validacion.general.js";
import { especialidadSchema } from "../middlewares/validaciones.especialidad.js";
import { authorize } from "../middlewares/authorize.middleware.js";
import { verifyToken } from "../middlewares/auth.middleware";

const router = Router();
// #swagger.tags = ['Especialidades']
router.get(
  "/",
  verifyToken,
  authorize("RECEPCIONISTA", "MEDICO", "GERENCIA"),
  getEspecialidades,
); // #swagger.security = [{ "bearerAuth": [] }]
// #swagger.tags = ['Especialidades']
router.get(
  "/:id",
  verifyToken,
  authorize("RECEPCIONISTA", "MEDICO", "GERENCIA"),
  getEspecialidadById,
); // #swagger.security = [{ "bearerAuth": [] }]
// #swagger.tags = ['Especialidades']
router.post(
  "/",
  verifyToken,
  authorize("GERENCIA"),
  validate(especialidadSchema),
  postEspecialidades,
); // #swagger.security = [{ "bearerAuth": [] }]
// #swagger.tags = ['Especialidades']
router.put(
  "/:id",
  verifyToken,
  authorize("GERENCIA"),
  validate(especialidadSchema),
  putEspecialidad,
); // #swagger.security = [{ "bearerAuth": [] }]
// #swagger.tags = ['Especialidades']
router.delete("/:id", verifyToken, authorize("GERENCIA"), deleteEspecialidad);
// #swagger.security = [{ "bearerAuth": [] }]
export default router;
