const mongoose = require("mongoose");

const VueloSchema = new mongoose.Schema({
  fecha: { type: Date, required: true },
  destino: { type: String, required: true },
  origen: { type: String, required: true },
  matricula: { type: String, required: true },
});

const Vuelo = mongoose.model("Vuelo", VueloSchema, "Aerolinea.Aerolineas"); // Asegúrate de que la colección sea la correcta

module.exports = Vuelo;
