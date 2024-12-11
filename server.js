import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import vueloRoutes from "./routes/vueloRoutes.js";
import tripulacionRoutes from "./routes/tripulacionRoutes.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: ["https://aerolinea-proyecto.onrender.com"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// Conexión con MongoDB
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:3000/aerolinea";

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Conexión a MongoDB exitosa"))
  .catch((err) => console.error("Error al conectar a MongoDB:", err));

// Definir rutas
app.use("/api/vuelo", vueloRoutes);
app.use("/api/tripulacion", tripulacionRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
