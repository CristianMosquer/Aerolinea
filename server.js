require("dotenv").config(); // Cargar variables de entorno desde el archivo .env
const path = require("path"); // Para trabajar con rutas de archivos
const express = require("express");
const mongoose = require("mongoose"); // Importar mongoose para la conexión a MongoDB
const app = express();
const port = 3000;

// Importar las rutas de vuelos
const vueloRoutes = require("./routes/vueloRoutes"); // Asegúrate de que el archivo de rutas existe
const tripulacionRoutes = require("./routes/tripulacionRoutes"); // Asegúrate de que el archivo de rutas existe

// Configuración de la conexión a MongoDB
const uri = process.env.MONGO_URI; // Obtener la URI de MongoDB desde las variables de entorno

if (!uri) {
  console.error("La variable de entorno MONGO_URI no está definida");
  process.exit(1); // Salir si no está definida la URI
}

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Conexión exitosa a MongoDB"))
  .catch((error) => console.error("Error conectando a MongoDB:", error));

// Middleware para procesar JSON
app.use(express.json()); // Asegurarse de que Express pueda manejar JSON
// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, "static")));

// Usar las rutas de vuelos en el prefijo '/api/vuelos'
app.use("/api/vuelos", vueloRoutes); // Esto Es para textear
app.use("/api/tripulacion", tripulacionRoutes); // Esto Es para textear
// Ruta base de prueba
//app.get("/", (req, res) => {
//res.send("¡Hola, mundo!");
//});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
