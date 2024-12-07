const express = require("express");
const {
  obtenerTripulacion,
  crearTripulante,
  actualizarTripulante,
  eliminarTripulante,
} = require("../controller/tripulacionController");

const router = express.Router();

router.route("/").get(obtenerTripulacion).post(crearTripulante);
router.route("/:id").put(actualizarTripulante).delete(eliminarTripulante);

module.exports = router;
