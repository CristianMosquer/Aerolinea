const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./config/db');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.vuelosPath = '/api/vuelos';

        this.conectarDB();
        this.middlewares();
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.vuelosPath, require('./routes/vueloRoutes'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en puerto ${this.port}`);
        });
    }
}

module.exports = Server;