const Vuelo = require("../models/Vuelo");

// Obtener todos los vuelos
const obtenerVuelos = async (req, res) => {
  try {
    // Asegúrate de que la base de datos y colección estén bien configuradas en el modelo
    const vuelos = await Vuelo.find(); // Aquí no necesitas ningún filtro, simplemente busca todos los vuelos
    console.log("Vuelos obtenidos:", vuelos); // Esto es solo para depuración
    res.json(vuelos); // Envía los vuelos como respuesta
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear un vuelo
const crearVuelo = async (req, res) => {
  try {
    const vuelo = new Vuelo(req.body);
    const vueloGuardado = await vuelo.save();
    res.status(201).json(vueloGuardado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Actualizar un vuelo
const actualizarVuelo = async (req, res) => {
  try {
    const vueloActualizado = await Vuelo.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    res.json(vueloActualizado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Eliminar un vuelo
const eliminarVuelo = async (req, res) => {
  try {
    await Vuelo.findByIdAndDelete(req.params.id);
    res.json({ message: "Vuelo eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { obtenerVuelos, crearVuelo, actualizarVuelo, eliminarVuelo };
