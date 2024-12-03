require('dotenv').config(); // Cargar variables de entorno desde el archivo .env

const express = require('express');
const mongoose = require('mongoose'); // Importar mongoose para la conexión a MongoDB
const app = express();
const port = 3000;

// Configuración de la conexión a MongoDB
const uri = process.env.MONGO_URI; // Obtener la URI de MongoDB desde las variables de entorno

if (!uri) {
    console.error('La variable de entorno MONGO_URI no está definida');
    process.exit(1); // Salir si no está definida la URI
}

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conexión exitosa a MongoDB'))
    .catch((error) => console.error('Error conectando a MongoDB:', error));

app.get('/', (req, res) => {
  res.send('Hola, mundo!');
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
