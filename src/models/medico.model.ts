import { prisma } from "../config/prisma.js";

export const medicoModel = {
  findAll: async () => {
    return await prisma.medicos.findMany({
      include: {
        especialidad: true,
      },
      orderBy: {
        id_medico: "asc",
      },
    });
  },

  findById: async (id: number) => {
    return await prisma.medicos.findUnique({
      where: {
        id_medico: id,
      },
      include: {
        especialidad: true,
      },
    });
  },

  findBySpecialty: async (nombreEspecialidad: string) => {
    return await prisma.medicos.findMany({
      where: {
        especialidad: {
          nombre: {
            equals: nombreEspecialidad,
            mode: "insensitive",
          },
        },
      },
      include: {
        especialidad: true,
      },
    });
  },

  create: async (
    nombre: string,
    apellido: string,
    email: string,
    id_especialidad: number,
  ) => {
    return await prisma.medicos.create({
      data: {
        nombre,
        apellido,
        email,
        id_especialidad,
      },
    });
  },

  update: async (
    id: number,
    nombre: string,
    apellido: string,
    email: string,
    id_especialidad: number,
  ) => {
    return await prisma.medicos.update({
      where: {
        id_medico: id,
      },
      data: {
        nombre,
        apellido,
        email,
        id_especialidad,
      },
    });
  },

  delete: async (id: number) => {
    return await prisma.medicos.delete({
      where: {
        id_medico: id,
      },
    });
  },
};
