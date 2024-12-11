const mongoose = require("mongoose");

const tripulacionSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  edad: { type: Number, required: true },
  cargo: { type: String, required: true },
  // Otros campos necesarios para el tripulante
});

const Tripulacion = mongoose.model("Tripulacion", tripulacionSchema);

module.exports = Tripulacion;
