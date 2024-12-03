const express = require('express');
const {
    obtenerVuelos,
    crearVuelo,
    actualizarVuelo,
    eliminarVuelo,
} = require('../controllers/vueloController');

const router = express.Router();

router.route('/').get(obtenerVuelos).post(crearVuelo);
router.route('/:id').put(actualizarVuelo).delete(eliminarVuelo);

module.exports = router;
