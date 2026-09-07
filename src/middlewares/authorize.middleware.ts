import type { Request, Response, NextFunction } from "express";
import type { AuthPayload } from "./auth.middleware";

export function authorize(...roles: AuthPayload["role"][]) {
  return (req: Request, res: Response, next: NextFunction) => {
    console.log("ROL DEL TOKEN:", req.user?.role);
    console.log("ROLES PERMITIDOS:", roles);
    if (!req.user || !roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "No tienes permiso para acceder a este recurso" });
    }
    next();
  };
}
