import { z } from "zod";

export const citaSchema = z.object({
  id_paciente: z.number().int().positive("El paciente debe ser válido"),

  id_medico: z.number().int().positive("El médico debe ser válido"),

  fecha_hora: z.coerce.date({
    message: "La fecha y hora no son válidas",
  }),
});
export const estadoCitaSchema = z.object({
  estado: z.enum(["Completada", "Cancelada"], {
    message: "El estado debe ser Completada o Cancelada",
  }),
});
