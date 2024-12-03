const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

const vueloRoutes = require('./routes/vueloRoutes');
const tripulacionRoutes = require('./routes/tripulacionRoutes');

dotenv.config();
connectDB();

const app = express();

app.use(express.json());

app.use('/api/vuelos', vueloRoutes);
app.use('/api/tripulacion', tripulacionRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
