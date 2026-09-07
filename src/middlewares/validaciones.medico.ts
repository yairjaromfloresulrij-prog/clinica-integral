import { z } from "zod";

export const medicoSchema = z.object({
  nombre: z.string().min(1, "El nombre es obligatorio"),
  apellido: z.string().min(1, "El apellido es obligatorio"),
  email: z.email("El email no es válido"),
  id_especialidad: z.number().int().positive("La especialidad debe ser válida"),
});
