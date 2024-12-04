require("dotenv").config();
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // Importar el módulo cors
const app = express();
const port = 3000;

const vueloRoutes = require("./routes/vueloRoutes");
const tripulacionRoutes = require("./routes/tripulacionRoutes");

const uri = process.env.MONGO_URI;

if (!uri) {
  console.error("La variable de entorno MONGO_URI no está definida");
  process.exit(1);
}

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Conexión exitosa a MongoDB"))
  .catch((error) => console.error("Error conectando a MongoDB:", error));

app.use(cors()); // Habilitar CORS para todas las rutas
app.use(express.json());
app.use(express.static(path.join(__dirname, "static")));

app.use("/api/vuelos", vueloRoutes);
app.use("/api/tripulacion", tripulacionRoutes);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});