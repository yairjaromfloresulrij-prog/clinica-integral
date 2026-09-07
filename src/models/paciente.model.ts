import { prisma } from "../config/prisma";

export const pacienteModel = {
  findAll: async () => {
    return await prisma.pacientes.findMany({
      orderBy: { id_paciente: "asc" },
    });
  },

  findById: async (id: number) => {
    return await prisma.pacientes.findUnique({
      where: { id_paciente: id },
      include: {
        citas: {
          include: {
            medico: { include: { especialidad: true } },
          },
          orderBy: { fecha_hora: "desc" },
        },
      },
    });
  },

  create: async (
    nombre: string,
    apellido: string,
    telefono: string,
    email: string | null,
    fecha_nacimiento: Date,
  ) => {
    return await prisma.pacientes.create({
      data: { nombre, apellido, telefono, email, fecha_nacimiento },
    });
  },

  update: async (
    id: number,
    nombre: string,
    apellido: string,
    telefono: string,
    email: string | null,
    fecha_nacimiento: Date,
  ) => {
    return await prisma.pacientes.update({
      where: { id_paciente: id },
      data: { nombre, apellido, telefono, email, fecha_nacimiento },
    });
  },

  delete: async (id: number) => {
    return await prisma.pacientes.delete({
      where: { id_paciente: id },
    });
  },
};
