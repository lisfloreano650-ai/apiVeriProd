const express = require('express');
const router = express.Router();

const {
    registrarProducto,
    obtenerProductos,
    buscarProductoPorCodigo
} = require('../controllers/productos.controller');

router.post('/', registrarProducto);
router.get('/', obtenerProductos);
router.get('/qr/:codigo', buscarProductoPorCodigo);

module.exports = router;