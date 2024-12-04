const mongoose = require("mongoose");
const Tripulacion = require("../models/tripulacion");

const obtenerTripulacion = async (req, res) => {
  try {
    const tripulacion = await Tripulacion.find().populate("id_vuelo"); // Relación con Vuelo
    res.json(tripulacion);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener la tripulación: " + error.message });
  }
};

const crearTripulante = async (req, res) => {
  try {
    // Validación del ID del vuelo
    if (!mongoose.Types.ObjectId.isValid(req.body.id_vuelo)) {
      return res.status(400).json({ message: "El ID del vuelo no es válido" });
    }

    const tripulante = new Tripulacion(req.body);
    const tripulanteGuardado = await tripulante.save();
    res.status(201).json(tripulanteGuardado);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error al crear tripulante: " + error.message });
  }
};

const actualizarTripulante = async (req, res) => {
  try {
    const tripulanteActualizado = await Tripulacion.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    res.json(tripulanteActualizado);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error al actualizar tripulante: " + error.message });
  }
};

const eliminarTripulante = async (req, res) => {
  try {
    await Tripulacion.findByIdAndDelete(req.params.id);
    res.json({ message: "Tripulante eliminado correctamente" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al eliminar tripulante: " + error.message });
  }
};

module.exports = {
  obtenerTripulacion,
  crearTripulante,
  actualizarTripulante,
  eliminarTripulante,
};
