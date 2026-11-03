import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (_req, file, cb) => {
    const extension = path.extname(file.originalname);
    const nombreArchivo = `perfil-${Date.now()}${extension}`;

    cb(null, nombreArchivo);
  },
});

export const uploadFoto = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
      return;
    }

    cb(new Error("El archivo debe ser una imagen"));
  },
});
