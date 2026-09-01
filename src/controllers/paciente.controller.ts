import type { Request, Response } from "express";
import { prisma } from "../config/prisma";
import { pacienteModel } from "../models/paciente.model";

export const getPacientes = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const pacientes = await prisma.pacientes.findMany();

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

    if (!nombre || !apellido || !telefono || !fecha_nacimiento) {
      res.status(400).json({
        message: "Faltan campos obligatorios",
      });
      return;
    }

    const nuevoPaciente = await prisma.pacientes.create({
      data: {
        nombre,
        apellido,
        telefono,
        email,
        fecha_nacimiento: new Date(fecha_nacimiento),
      },
    });

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
