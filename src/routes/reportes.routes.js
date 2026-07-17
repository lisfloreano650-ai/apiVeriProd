const express = require('express');
const router = express.Router();

const {
    registrarReporte,
    obtenerReportes
} = require('../controllers/reportes.controller');

// Registrar reporte
router.post('/', registrarReporte);

// Obtener todos los reportes
router.get('/', obtenerReportes);

module.exports = router;