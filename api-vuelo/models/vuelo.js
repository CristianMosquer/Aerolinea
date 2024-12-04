const { Schema, model } = require('mongoose');

const VueloSchema = Schema({
    numeroVuelo: {
        type: String,
        required: [true, 'El número de vuelo es obligatorio'],
        unique: true
    },
    origen: {
        type: String,
        required: [true, 'El origen es obligatorio']
    },
    destino: {
        type: String,
        required: [true, 'El destino es obligatorio']
    },
    fechaSalida: {
        type: Date,
        required: [true, 'La fecha de salida es obligatoria']
    },
    fechaLlegada: {
        type: Date,
        required: [true, 'La fecha de llegada es obligatoria']
    },
    estado: {
        type: String,
        enum: ['Programado', 'Demorado', 'Cancelado', 'En Vuelo', 'Aterrizado'],
        default: 'Programado'
    }
});

module.exports = model('Vuelo', VueloSchema);