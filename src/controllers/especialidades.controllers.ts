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
export const getEspecialidadById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({
        message: "El ID debe ser un número",
      });
      return;
    }

    const especialidad = await especialidadModel.findById(id);

    if (!especialidad) {
      res.status(404).json({
        message: "Especialidad no encontrada",
      });
      return;
    }

    res.json({
      data: especialidad,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener la especialidad",
      error,
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
