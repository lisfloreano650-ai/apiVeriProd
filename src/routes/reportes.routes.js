const express = require('express');
const router = express.Router();

const {
    registrarReporte,
    obtenerReportes,
    actualizarEstadoReporte
} = require('../controllers/reportes.controller');

// Registrar reporte
router.post('/', registrarReporte);

// Obtener todos los reportes
router.get('/', obtenerReportes);

// Actualizar estado del reporte
router.put('/:id', actualizarEstadoReporte);

module.exports = router;