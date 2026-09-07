import { Router } from "express";
import {
  getCitas,
  getCitaById,
  postCita,
  putCita,
  actualizarEstadoCita,
  deleteCita,
} from "../controllers/citas.controller.js";
import { validate } from "../middlewares/validacion.general.js";
import {
  citaSchema,
  estadoCitaSchema,
} from "../middlewares/validaciones.citas.js";
import { authorize } from "../middlewares/authorize.middleware.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.get(
  "/",
  verifyToken,
  authorize("RECEPCIONISTA", "MEDICO", "GERENCIA"),
  getCitas,
); // #swagger.tags = ['Citas']
// #swagger.security = [{ "bearerAuth": [] }]
router.get(
  "/:id",
  verifyToken,
  authorize("RECEPCIONISTA", "MEDICO", "GERENCIA"),
  getCitaById,
); // #swagger.tags = ['Citas']
// #swagger.security = [{ "bearerAuth": [] }]
router.post(
  "/",
  verifyToken,
  authorize("RECEPCIONISTA", "GERENCIA"),
  validate(citaSchema),
  postCita,
); // #swagger.tags = ['Citas']
// #swagger.security = [{ "bearerAuth": [] }]
router.put(
  "/:id",
  verifyToken,
  authorize("RECEPCIONISTA", "GERENCIA"),
  validate(citaSchema),
  putCita,
); // #swagger.tags = ['Citas']
// #swagger.security = [{ "bearerAuth": [] }]
router.patch(
  "/:id/estado",
  verifyToken,
  authorize("MEDICO"),
  validate(estadoCitaSchema),
  actualizarEstadoCita,
); // #swagger.tags = ['Citas']
// #swagger.security = [{ "bearerAuth": [] }]
router.delete("/:id", verifyToken, authorize("GERENCIA"), deleteCita); // #swagger.tags = ['Citas']
// #swagger.security = [{ "bearerAuth": [] }]
export default router;
