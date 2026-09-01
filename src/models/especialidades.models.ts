import { prisma } from "../config/prisma";

export const especialidadModel = {
  findAll: async () => {
    return await prisma.especialidad.findMany({
      orderBy: { id_especialidad: "asc" },
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
