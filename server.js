const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config(); // Importa dotenv para usar variables de entorno

const app = express();

// Middleware para habilitar CORS
app.use(
  cors({
    origin: ["https://aerolinea-proyecto.onrender.com"], // Dominios permitidos
    methods: ["GET", "POST", "PUT", "DELETE"], // Métodos HTTP permitidos
    allowedHeaders: ["Content-Type", "Authorization"], // Encabezados permitidos
  })
);

// Middleware para procesar cuerpos JSON
app.use(express.json());

// Intentar cargar rutas de VueloRoutes
let vueloRoutes;
try {
  vueloRoutes = require("./routes/vueloRoutes");
} catch (error) {
  console.error(
    "Error al cargar VueloRoutes. Asegúrate de que el archivo ./routes/vueloRoutes.js exista y no tenga errores."
  );
  process.exit(1); // Finaliza la aplicación si no se encuentra el archivo
}

// Intentar cargar rutas de TripulacionRoutes
let tripulacionRoutes;
try {
  tripulacionRoutes = require("./routes/TripulacionRoutes"); // Asegúrate de que la ruta esté correcta
} catch (error) {
  console.error(
    "Error al cargar TripulacionRoutes. Asegúrate de que el archivo ./routes/TripulacionRoutes.js exista y no tenga errores."
  );
  process.exit(1); // Finaliza la aplicación si no se encuentra el archivo
}

// Conexión con MongoDB
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/aerolinea"; // Ajusta la URI si es necesario

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    connectTimeoutMS: 30000, // Aumenta el tiempo de espera
  })
  .then(() => console.log("Conexión a MongoDB exitosa"))
  .catch((err) => console.error("Error al conectar a MongoDB:", err));

// Manejo de eventos de conexión
mongoose.connection.on("error", (err) => {
  console.error("Error en la conexión con MongoDB:", err);
});
mongoose.connection.once("open", () => {
  console.log("Conexión establecida con MongoDB");
});

// Definir rutas
app.use("/api/vuelos", vueloRoutes); // Ruta para vuelos
app.use("/api/tripulacion", tripulacionRoutes); // Ruta para tripulación

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
