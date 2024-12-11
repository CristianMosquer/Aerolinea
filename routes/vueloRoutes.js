const express = require("express");
const {
  getAllVuelos,
  createVuelo,
  getVueloById,
  updateVuelo,
  deleteVuelo,
} = require("../controllers/vueloController");

const router = express.Router();

// Ruta para obtener todos los vuelos
router.get("/", getAllVuelos);

// Ruta para crear un nuevo vuelo
router.post("/", createVuelo);

// Ruta para obtener un vuelo por ID
router.get("/:id", getVueloById);

// Ruta para actualizar un vuelo por ID
router.put("/:id", updateVuelo);

// Ruta para eliminar un vuelo por ID
router.delete("/:id", deleteVuelo);

module.exports = router;
