const Vuelo = require("../models/Vuelo");

// Obtener todos los vuelos
const getAllVuelos = async (req, res) => {
  try {
    const vuelos = await Vuelo.find();
    res.status(200).json(vuelos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear un nuevo vuelo
const createVuelo = async (req, res) => {
  const { fecha, destino, origen, matricula } = req.body;

  try {
    const newVuelo = new Vuelo({
      fecha,
      destino,
      origen,
      matricula,
    });

    await newVuelo.save();
    res.status(201).json(newVuelo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un vuelo por ID
const getVueloById = async (req, res) => {
  try {
    const vuelo = await Vuelo.findById(req.params.id);
    if (!vuelo) {
      return res.status(404).json({ message: "Vuelo no encontrado" });
    }
    res.status(200).json(vuelo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un vuelo por ID
const updateVuelo = async (req, res) => {
  const { fecha, destino, origen, matricula } = req.body;

  try {
    const updatedVuelo = await Vuelo.findByIdAndUpdate(
      req.params.id,
      { fecha, destino, origen, matricula },
      { new: true } // Retorna el documento actualizado
    );
    if (!updatedVuelo) {
      return res.status(404).json({ message: "Vuelo no encontrado" });
    }
    res.status(200).json(updatedVuelo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un vuelo por ID
const deleteVuelo = async (req, res) => {
  try {
    const deletedVuelo = await Vuelo.findByIdAndDelete(req.params.id);
    if (!deletedVuelo) {
      return res.status(404).json({ message: "Vuelo no encontrado" });
    }
    res.status(200).json({ message: "Vuelo eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllVuelos,
  createVuelo,
  getVueloById,
  updateVuelo,
  deleteVuelo,
};
