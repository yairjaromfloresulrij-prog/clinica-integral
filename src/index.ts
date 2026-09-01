import express from "express";
import dotenv from "dotenv";
import especialidadRouter from "./routes/especialidades.routes";
import pacientesRouter from "./routes/paciente.routes.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/pacientes", pacientesRouter);
app.use("/especialidades", especialidadRouter);

app.listen(PORT, () => {
  console.log(`Api corriendo en el http://localhost:${PORT}`);
});
