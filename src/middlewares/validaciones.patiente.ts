import { z } from "zod";

export const patientSchema = z.object({
  nombre: z.string().min(1, "El nombre es obligatorio"),
  apellido: z.string().min(1, "El apellido es obligatorio"),
  telefono: z.string().min(1, "El teléfono es obligatorio"),
  email: z
    .email({
      message: "El correo no tiene un formato válido",
    })
    .optional(),
  fecha_nacimiento: z.coerce
    .date()
    .max(new Date(), "La fecha de nacimiento no puede ser futura"),
});
