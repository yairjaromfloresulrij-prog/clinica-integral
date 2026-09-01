import { prisma } from "../config/prisma";

export const especialidadModel = {
  findAll: async () => {
    return await prisma.especialidad.findMany({
      orderBy: { id_especialidad: "asc" },
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
};
