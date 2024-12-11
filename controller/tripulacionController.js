const Tripulacion = require("../models/Tripulacion"); // Asegúrate de que el modelo esté en la ubicación correcta

// Función para obtener todos los tripulantes
const getAllTripulacion = async () => {
  try {
    const tripulantes = await Tripulacion.find(); // Obtiene todos los tripulantes de la base de datos
    return tripulantes;
  } catch (error) {
    throw new Error("Error al obtener los tripulantes"); // Si ocurre un error, lo lanzamos
  }
};

// Función para crear un tripulante
const createTripulacion = async (data) => {
  try {
    const newTripulante = new Tripulacion(data); // Crea un nuevo tripulante
    await newTripulante.save(); // Guarda el nuevo tripulante en la base de datos
    return newTripulante;
  } catch (error) {
    throw new Error("Error al crear el tripulante"); // Si ocurre un error, lo lanzamos
  }
};

module.exports = {
  getAllTripulacion,
  createTripulacion,
};
