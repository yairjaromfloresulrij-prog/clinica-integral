import type { Request, Response } from "express";
import { pacienteModel } from "../models/paciente.model.js";

export const getPacientes = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const pacientes = await pacienteModel.findAll();

    res.json({
      data: pacientes,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener los pacientes",
      error,
    });
  }
};

export const getPacienteById = async (
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

    const paciente = await pacienteModel.findById(id);

    if (!paciente) {
      res.status(404).json({
        message: "Paciente no encontrado",
      });
      return;
    }

    res.json({
      data: paciente,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener el paciente",
      error,
    });
  }
};

export const postPaciente = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { nombre, apellido, telefono, email, fecha_nacimiento } = req.body;

    const nuevoPaciente = await pacienteModel.create(
      nombre,
      apellido,
      telefono,
      email,
      new Date(fecha_nacimiento),
    );

    res.status(201).json({
      message: "Paciente creado con éxito",
      data: nuevoPaciente,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al crear el paciente",
      error,
    });
  }
};

export const putPaciente = async (
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

    const { nombre, apellido, telefono, email, fecha_nacimiento } = req.body;

    const paciente = await pacienteModel.findById(id);

    if (!paciente) {
      res.status(404).json({
        message: "Paciente no encontrado",
      });
      return;
    }

    const pacienteActualizado = await pacienteModel.update(
      id,
      nombre,
      apellido,
      telefono,
      email,
      new Date(fecha_nacimiento),
    );

    res.json({
      message: "Paciente actualizado con éxito",
      data: pacienteActualizado,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar el paciente",
      error,
    });
  }
};

export const deletePaciente = async (
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

    const paciente = await pacienteModel.findById(id);

    if (!paciente) {
      res.status(404).json({
        message: "Paciente no encontrado",
      });
      return;
    }

    await pacienteModel.delete(id);

    res.json({
      message: "Paciente eliminado con éxito",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar el paciente",
      error,
    });
  }
};
