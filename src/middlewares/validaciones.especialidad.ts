import { z } from "zod";

export const especialidadSchema = z.object({
  nombre: z
    .string()
    .min(1, "El nombre de la especialidad es obligatorio")
    .max(
      100,
      "El nombre de la especialidad no puede superar los 100 caracteres",
    ),
});
