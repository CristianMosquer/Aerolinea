const express = require('express');
const router = express.Router();
const { getVuelos, crearVuelo, actualizarVuelo, eliminarVuelo } = require('../controllers/vueloController');

router.get('/', getVuelos);
router.post('/', crearVuelo);
router.put('/:id', actualizarVuelo);
router.delete('/:id', eliminarVuelo);

module.exports = router;