const Vuelo = require('../models/vuelo');

// Obtener todos los vuelos
const getVuelos = async (req, res) => {
    try {
        const vuelos = await Vuelo.find();
        res.json(vuelos);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener los vuelos', error });
    }
};

// Crear un nuevo vuelo
const crearVuelo = async (req, res) => {
    try {
        const nuevoVuelo = new Vuelo(req.body);
        await nuevoVuelo.save();
        res.status(201).json(nuevoVuelo);
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al crear el vuelo', error });
    }
};

// Actualizar un vuelo
const actualizarVuelo = async (req, res) => {
    try {
        const vuelo = await Vuelo.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!vuelo) {
            return res.status(404).json({ mensaje: 'Vuelo no encontrado' });
        }
        res.json(vuelo);
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al actualizar el vuelo', error });
    }
};

// Eliminar un vuelo
const eliminarVuelo = async (req, res) => {
    try {
        const vuelo = await Vuelo.findByIdAndDelete(req.params.id);
        if (!vuelo) {
            return res.status(404).json({ mensaje: 'Vuelo no encontrado' });
        }
        res.json({ mensaje: 'Vuelo eliminado correctamente' });
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al eliminar el vuelo', error });
    }
};

module.exports = {
    getVuelos,
    crearVuelo,
    actualizarVuelo,
    eliminarVuelo
};