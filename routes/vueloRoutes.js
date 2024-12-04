const express = require("express");
const {
  obtenerVuelos,
  crearVuelo,
  actualizarVuelo,
  eliminarVuelo,
} = require("../controller/vueloController"); // Importar los controladores

const router = express.Router();

// Definir las rutas
router
  .route("/")
  .get(obtenerVuelos) // Obtener vuelos
  .post(crearVuelo); // Crear vuelo

router
  .route("/:id")
  .put(actualizarVuelo) // Actualizar vuelo
  .delete(eliminarVuelo); // Eliminar vuelo

module.exports = router;
