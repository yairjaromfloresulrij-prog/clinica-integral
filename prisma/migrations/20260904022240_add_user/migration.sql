/*
  Warnings:

  - The `estado` column on the `citas` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `paciente` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "EstadoCita" AS ENUM ('Programada', 'Confirmada', 'Cancelada', 'Realizada');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('RECEPCIONISTA', 'MEDICO', 'GERENCIA');

-- DropForeignKey
ALTER TABLE "citas" DROP CONSTRAINT "citas_id_paciente_fkey";

-- AlterTable
ALTER TABLE "citas" DROP COLUMN "estado",
ADD COLUMN     "estado" "EstadoCita" NOT NULL DEFAULT 'Programada';

-- DropTable
DROP TABLE "paciente";

-- CreateTable
CREATE TABLE "pacientes" (
    "id_paciente" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "email" TEXT,
    "fecha_nacimiento" TIMESTAMP(3) NOT NULL,
    "fecha_registro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pacientes_pkey" PRIMARY KEY ("id_paciente")
);

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "pacientes_email_key" ON "pacientes"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "citas" ADD CONSTRAINT "citas_id_paciente_fkey" FOREIGN KEY ("id_paciente") REFERENCES "pacientes"("id_paciente") ON DELETE RESTRICT ON UPDATE CASCADE;
