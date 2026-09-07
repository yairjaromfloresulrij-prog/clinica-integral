import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../config/prisma.js";

export async function register(req: Request, res: Response) {
  console.log("ENTRÓ AL REGISTER");
  try {
    const { email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("DATOS:", email, password, role);
    console.log("PASSWORD HASHEADA");
    console.log("VOY A CREAR EL USUARIO");
    const user = await prisma.user.create({
      data: { email, password: hashedPassword, role },
      select: { id: true, email: true, role: true },
    });
    console.log("USUARIO CREADO:", user);
    res.status(201).json(user);
  } catch {
    res.status(500).json({ message: "Error al registrar el usuario" });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }
    console.log("USUARIO LOGIN:", user);
    console.log("ROL DEL USUARIO:", user.role);
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "8h" },
    );

    res.json({ token });
  } catch (error) {
    console.error("ERROR AL REGISTRAR:", error);

    res.status(500).json({
      message: "Error al registrar el usuario",
    });
  }
}
