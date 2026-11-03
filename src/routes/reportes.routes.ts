import { Router } from "express";
import { getMedicosPorEspecialidad } from "../controllers/reportes.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/authorize.middleware.js";

const router: Router = Router();

// #swagger.tags = ['Reportes']
router.get(
  "/especialidades",
  verifyToken,
  authorize("RECEPCIONISTA", "MEDICO", "GERENCIA"),
  getMedicosPorEspecialidad,
); // #swagger.security = [{ "bearerAuth": [] }]

export default router;
