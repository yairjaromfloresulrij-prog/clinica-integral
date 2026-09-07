import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../src/swagger_output.json" with { type: "json" };
import authRouter from "./routes/auth.routes.js";
import especialidadRouter from "./routes/especialidades.routes.js";
import pacientesRouter from "./routes/paciente.routes.js";
import medicoRouter from "./routes/medico.routes.js";
import citaRouter from "./routes/citas.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

// Swagger
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rutas
app.use("/api/auth", authRouter);
app.use("/api/pacientes", pacientesRouter);
app.use("/api/especialidades", especialidadRouter);
app.use("/api/medicos", medicoRouter);
app.use("/api/citas", citaRouter);

app.listen(PORT, () => {
  console.log(`Api corriendo en http://localhost:${PORT}`);
});
