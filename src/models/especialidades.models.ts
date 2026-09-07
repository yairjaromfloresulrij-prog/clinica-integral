import { prisma } from "../config/prisma.js";

export const especialidadModel = {
  findAll: async () => {
    return await prisma.especialidad.findMany({
      orderBy: {
        id_especialidad: "asc",
      },
    });
  },
  findById: async (id: number) => {
    return await prisma.especialidad.findUnique({
      where: {
        id_especialidad: id,
      },
    });
  },
  create: async (nombre: string) => {
    return await prisma.especialidad.create({
      data: {
        nombre,
      },
    });
  },
  update: async (id: number, nombre: string) => {
    return await prisma.especialidad.update({
      where: {
        id_especialidad: id,
      },
      data: {
        nombre,
      },
    });
  },
  delete: async (id: number) => {
    return await prisma.especialidad.delete({
      where: {
        id_especialidad: id,
      },
    });
  },
};
