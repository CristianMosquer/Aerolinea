const mongoose = require('mongoose');

const TripulacionSchema = new mongoose.Schema({
    id_vuelo: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Vuelo', 
        required: [true, "El ID del vuelo es obligatorio"] 
    },
    cedula: { 
        type: Number, 
        required: [true, "La cédula es obligatoria"] 
    },
    puesto: { 
        type: String, 
        required: [true, "El puesto es obligatorio"] 
    },
});

module.exports = mongoose.model('Tripulacion', TripulacionSchema);
