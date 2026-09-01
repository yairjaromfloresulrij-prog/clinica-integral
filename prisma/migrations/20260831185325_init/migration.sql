-- CreateTable
CREATE TABLE "paciente" (
    "id_paciente" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "email" TEXT,
    "fecha_nacimiento" TIMESTAMP(3) NOT NULL,
    "fecha_registro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "paciente_pkey" PRIMARY KEY ("id_paciente")
);

-- CreateTable
CREATE TABLE "especialidad" (
    "id_especialidad" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "especialidad_pkey" PRIMARY KEY ("id_especialidad")
);

-- CreateTable
CREATE TABLE "medicos" (
    "id_medico" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "id_especialidad" INTEGER NOT NULL,

    CONSTRAINT "medicos_pkey" PRIMARY KEY ("id_medico")
);

-- CreateTable
CREATE TABLE "citas" (
    "id_cita" SERIAL NOT NULL,
    "id_paciente" INTEGER NOT NULL,
    "id_medico" INTEGER NOT NULL,
    "fecha_hora" TIMESTAMP(3) NOT NULL,
    "estado" TEXT NOT NULL DEFAULT 'Programada',

    CONSTRAINT "citas_pkey" PRIMARY KEY ("id_cita")
);

-- CreateIndex
CREATE UNIQUE INDEX "paciente_email_key" ON "paciente"("email");

-- CreateIndex
CREATE UNIQUE INDEX "especialidad_nombre_key" ON "especialidad"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "medicos_email_key" ON "medicos"("email");

-- AddForeignKey
ALTER TABLE "medicos" ADD CONSTRAINT "medicos_id_especialidad_fkey" FOREIGN KEY ("id_especialidad") REFERENCES "especialidad"("id_especialidad") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "citas" ADD CONSTRAINT "citas_id_paciente_fkey" FOREIGN KEY ("id_paciente") REFERENCES "paciente"("id_paciente") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "citas" ADD CONSTRAINT "citas_id_medico_fkey" FOREIGN KEY ("id_medico") REFERENCES "medicos"("id_medico") ON DELETE RESTRICT ON UPDATE CASCADE;
