import type { Response, Request } from "express";
import { especialidadModel } from "../models/especialidades.models";

export const getEspecialidades = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const especialidades = await especialidadModel.findAll();

    res.json({
      data: especialidades,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const postEspecialidades = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { nombre } = req.body;

    if (!nombre) {
      res.status(400).json({
        err: "Falta el nombre de la especialidad",
      });
      return;
    }

    const newEspecialidad = await especialidadModel.create(nombre);

    res.status(201).json({
      message: "Especialidad añadida con éxito",
      data: newEspecialidad,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};
