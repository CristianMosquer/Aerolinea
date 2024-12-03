const Tripulacion = require('../models/Tripulacion');

const obtenerTripulacion = async (req, res) => {
    try {
        const tripulacion = await Tripulacion.find().populate('id_vuelo');
        res.json(tripulacion);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const crearTripulante = async (req, res) => {
    try {
        const tripulante = new Tripulacion(req.body);
        const tripulanteGuardado = await tripulante.save();
        res.status(201).json(tripulanteGuardado);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const actualizarTripulante = async (req, res) => {
    try {
        const tripulanteActualizado = await Tripulacion.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        res.json(tripulanteActualizado);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const eliminarTripulante = async (req, res) => {
    try {
        await Tripulacion.findByIdAndDelete(req.params.id);
        res.json({ message: 'Tripulante eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { obtenerTripulacion, crearTripulante, actualizarTripulante, eliminarTripulante };
