import type { Request, Response } from "express";
import { citaModel } from "../models/citas.model.js";

export const getCitas = async (req: Request, res: Response): Promise<void> => {
  try {
    const citas = await citaModel.findAll();

    res.json({
      data: citas,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getCitaById = async (
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

    const cita = await citaModel.findById(id);

    if (!cita) {
      res.status(404).json({
        message: "Cita no encontrada",
      });
      return;
    }

    res.json({
      data: cita,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const postCita = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id_paciente, id_medico, fecha_hora } = req.body;

    const fecha = new Date(fecha_hora);

    // No permitir citas en fechas pasadas
    if (fecha <= new Date()) {
      res.status(400).json({
        message: "No se puede agendar una cita en una fecha que ya pasó",
      });
      return;
    }

    const nuevaCita = await citaModel.create(id_paciente, id_medico, fecha);

    res.status(201).json({
      message: "Cita creada con éxito",
      data: nuevaCita,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const putCita = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({
        message: "El ID debe ser un número",
      });
      return;
    }

    const { id_paciente, id_medico, fecha_hora, estado } = req.body;

    const cita = await citaModel.findById(id);

    if (!cita) {
      res.status(404).json({
        message: "Cita no encontrada",
      });
      return;
    }

    const citaActualizada = await citaModel.update(
      id,
      id_paciente,
      id_medico,
      fecha_hora,
      estado,
    );

    res.json({
      message: "Cita actualizada con éxito",
      data: citaActualizada,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const actualizarEstadoCita = async (
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

    const cita = await citaModel.findById(id);

    if (!cita) {
      res.status(404).json({
        message: "Cita no encontrada",
      });
      return;
    }

    const { estado } = req.body;

    const citaActualizada = await citaModel.updateEstado(id, estado);

    res.status(200).json({
      message: "Estado de la cita actualizado correctamente",
      data: citaActualizada,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteCita = async (
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

    const cita = await citaModel.findById(id);

    if (!cita) {
      res.status(404).json({
        message: "Cita no encontrada",
      });
      return;
    }

    await citaModel.delete(id);

    res.json({
      message: "Cita eliminada con éxito",
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};
