import fs from "fs-extra";

export const cleanUploadsFolder = async (req, res, next) => {
  try {
    await fs.emptyDir("src/uploads");
    next();
  } catch (error) {
    console.error("Error al limpiar la carpeta uploads:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
