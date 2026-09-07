import { prisma } from "../config/prisma.js";
import { EstadoCita } from "../../generated/prisma/enums.js";
export const citaModel = {
  findAll: async () => {
    return await prisma.citas.findMany({
      include: {
        paciente: true,
        medico: {
          include: {
            especialidad: true,
          },
        },
      },
      orderBy: {
        fecha_hora: "asc",
      },
    });
  },

  findById: async (id: number) => {
    return await prisma.citas.findUnique({
      where: {
        id_cita: id,
      },
      include: {
        paciente: true,
        medico: {
          include: {
            especialidad: true,
          },
        },
      },
    });
  },

  create: async (id_paciente: number, id_medico: number, fecha_hora: Date) => {
    return await prisma.citas.create({
      data: {
        id_paciente,
        id_medico,
        fecha_hora,
        estado: "Programada",
      },
    });
  },

  update: async (
    id: number,
    id_paciente: number,
    id_medico: number,
    fecha_hora: Date,
    estado: "Programada" | "Confirmada" | "Cancelada" | "Realizada",
  ) => {
    return await prisma.citas.update({
      where: {
        id_cita: id,
      },
      data: {
        id_paciente,
        id_medico,
        fecha_hora,
        estado,
      },
    });
  },

  updateEstado: async (id: number, estado: EstadoCita) => {
    return await prisma.citas.update({
      where: {
        id_cita: id,
      },
      data: {
        estado,
      },
    });
  },

  delete: async (id: number) => {
    return await prisma.citas.delete({
      where: {
        id_cita: id,
      },
    });
  },
};
