const mongoose = require('mongoose');

const VueloSchema = new mongoose.Schema({
    fecha: { type: Date, required: true },
    destino: { type: String, required: true },
    origen: { type: String, required: true },
    matricula: { type: String, required: true },
});

module.exports = mongoose.model('Vuelo', VueloSchema);
