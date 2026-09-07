import type { Request, Response } from "express";
import { medicoModel } from "../models/medico.model.js";

export const getMedicos = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const nombreEspecialidad = req.query.especialidad as string | undefined;

    const medicos = nombreEspecialidad
      ? await medicoModel.findBySpecialty(nombreEspecialidad)
      : await medicoModel.findAll();

    res.json({ data: medicos });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener los médicos",
      error,
    });
  }
};

export const getMedicoById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({ message: "El ID debe ser un número" });
      return;
    }

    const medico = await medicoModel.findById(id);

    if (!medico) {
      res.status(404).json({ message: "Médico no encontrado" });
      return;
    }

    res.json({ data: medico });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener el médico",
      error,
    });
  }
};

export const postMedico = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { nombre, apellido, email, id_especialidad } = req.body;

    const nuevoMedico = await medicoModel.create(
      nombre,
      apellido,
      email,
      id_especialidad,
    );

    res.status(201).json({
      message: "Médico creado con éxito",
      data: nuevoMedico,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al crear el médico",
      error,
    });
  }
};

export const putMedico = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({ message: "El ID debe ser un número" });
      return;
    }

    const { nombre, apellido, email, id_especialidad } = req.body;

    const medico = await medicoModel.findById(id);

    if (!medico) {
      res.status(404).json({ message: "Médico no encontrado" });
      return;
    }

    const medicoActualizado = await medicoModel.update(
      id,
      nombre,
      apellido,
      email,
      id_especialidad,
    );

    res.json({
      message: "Médico actualizado con éxito",
      data: medicoActualizado,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar el médico",
      error,
    });
  }
};

export const deleteMedico = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({ message: "El ID debe ser un número" });
      return;
    }

    const medico = await medicoModel.findById(id);

    if (!medico) {
      res.status(404).json({ message: "Médico no encontrado" });
      return;
    }

    await medicoModel.delete(id);

    res.json({ message: "Médico eliminado con éxito" });
  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar el médico",
      error,
    });
  }
};
