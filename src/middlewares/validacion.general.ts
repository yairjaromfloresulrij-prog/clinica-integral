import type { Request, Response, NextFunction } from "express";
import type { ZodType } from "zod";

export const validate = (schema: ZodType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const resultado = schema.safeParse(req.body);

    if (!resultado.success) {
      res.status(400).json({
        message: "Datos inválidos",
        errors: resultado.error.issues,
      });
      return;
    }

    req.body = resultado.data;
    next();
  };
};
