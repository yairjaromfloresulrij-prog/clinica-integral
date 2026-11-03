import type { Request, Response } from "express";
import { EstadoCita } from "../../generated/prisma/enums.js";
import { citaModel } from "../models/citas.model.js";

export const getCitas = async (req: Request, res: Response): Promise<void> => {
  try {
    const estadoQuery = req.query.estado as string | undefined;

    const paginaQuery = Number(req.query.pagina) || 1;

    if (paginaQuery < 1) {
      res.status(400).json({
        message: "La página debe ser mayor o igual a 1",
      });
      return;
    }

    if (
      estadoQuery &&
      estadoQuery !== "Todos" &&
      estadoQuery !== "Completada" &&
      !Object.values(EstadoCita).includes(estadoQuery as EstadoCita)
    ) {
      res.status(400).json({
        message: "Estado de cita inválido",
      });
      return;
    }

    const estado =
      estadoQuery === "Todos" || !estadoQuery
        ? undefined
        : estadoQuery === "Completada"
          ? EstadoCita.Realizada
          : (estadoQuery as EstadoCita);

    const resultado = await citaModel.findAll(estado, paginaQuery, 10);

    const totalPaginas = Math.ceil(resultado.total / 10);

    res.json({
      data: resultado.citas,
      total: resultado.total,
      pagina: paginaQuery,
      totalPaginas,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener las citas",
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
