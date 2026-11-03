import type { Request, Response } from "express";
import { reportesModel } from "../models/reportes.models.js";

export const getMedicosPorEspecialidad = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const reporte = await reportesModel.cantidadMedicosPorEspecialidad();

    res.json({
      data: reporte,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener el reporte de especialidades",
    });
  }
};
