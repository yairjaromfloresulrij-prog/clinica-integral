import swaggerAutogen from "swagger-autogen";
import fs from "fs";

const doc = {
  openapi: "3.0.0",

  info: {
    title: "API Clínica Salud Integral",
    description:
      "API REST para la gestión de pacientes, médicos, especialidades y citas",
    version: "1.0.0",
  },

  servers: [
    {
      url: "http://localhost:3000",
    },
  ],

  tags: [
    { name: "Autenticación" },
    { name: "Pacientes" },
    { name: "Médicos" },
    { name: "Especialidades" },
    { name: "Citas" },
  ],
  security: [{ bearerAuth: [] }],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
};

const outputFile = "./src/swagger_output.json";

await swaggerAutogen({ openapi: "3.0.0" })(outputFile, ["./src/index.ts"], doc);

const swagger = JSON.parse(fs.readFileSync(outputFile, "utf-8"));

const tags: Record<string, string> = {
  "/api/auth": "Autenticación",
  "/api/pacientes": "Pacientes",
  "/api/medicos": "Médicos",
  "/api/especialidades": "Especialidades",
  "/api/citas": "Citas",
};

for (const path of Object.keys(swagger.paths)) {
  for (const prefix in tags) {
    if (path.startsWith(prefix)) {
      for (const method of Object.keys(swagger.paths[path])) {
        swagger.paths[path][method].tags = [tags[prefix]];
      }
    }
  }
}

fs.writeFileSync(outputFile, JSON.stringify(swagger, null, 2));

console.log("Swagger generado correctamente.");
