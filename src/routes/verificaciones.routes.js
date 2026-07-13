const express = require('express');
const router = express.Router();

const {
    registrarVerificacion,
    obtenerHistorial
} = require('../controllers/verificaciones.controller');

router.post('/', registrarVerificacion);

router.get('/', obtenerHistorial);

module.exports = router;