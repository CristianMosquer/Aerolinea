const express = require("express");
const {
  getAllTripulacion,
  createTripulacion,
} = require("../controllers/tripulacionController");

const router = express.Router();

// Ruta para obtener todos los tripulantes
router.get("/", async (req, res) => {
  try {
    const tripulacion = await getAllTripulacion();
    res.status(200).json(tripulacion);
  } catch (error) {
    console.error("Error al obtener los tripulantes:", error);
    res.status(500).json({ message: "Error al obtener los tripulantes" });
  }
});

// Ruta para crear un nuevo tripulante
router.post("/", async (req, res) => {
  try {
    const newTripulante = await createTripulacion(req.body);
    res.status(201).json(newTripulante);
  } catch (error) {
    console.error("Error al crear el tripulante:", error);
    res.status(500).json({ message: "Error al crear el tripulante" });
  }
});

module.exports = router;
