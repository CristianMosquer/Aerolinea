const mongoose = require('mongoose');

const TripulacionSchema = new mongoose.Schema({
    id_vuelo: { type: mongoose.Schema.Types.ObjectId, ref: 'Vuelo', required: true },
    cedula: { type: Number, required: true },
    puesto: { type: String, required: true },
});

module.exports = mongoose.model('Tripulacion', TripulacionSchema);
