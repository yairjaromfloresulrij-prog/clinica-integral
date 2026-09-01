import express from "express";
import dotenv from "dotenv";
import especialidadRouter from "./routes/especialidades.routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/especialidades", especialidadRouter);

app.listen(PORT, () => {
  console.log(`Api corriendo en el http://localhost:${PORT}`);
});
