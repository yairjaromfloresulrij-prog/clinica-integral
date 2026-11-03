import { prisma } from "../config/prisma.js";

export const reportesModel = {
  cantidadMedicosPorEspecialidad: async () => {
    const medicos = await prisma.medicos.findMany({
      include: {
        especialidad: true,
      },
    });

    const resultado: {
      especialidad: string;
      cantidad: number;
    }[] = [];

    for (const medico of medicos) {
      const nombreEspecialidad = medico.especialidad.nombre;

      const existente = resultado.find(
        (item) => item.especialidad === nombreEspecialidad,
      );

      if (existente) {
        existente.cantidad++;
      } else {
        resultado.push({
          especialidad: nombreEspecialidad,
          cantidad: 1,
        });
      }
    }

    return resultado;
  },
};
