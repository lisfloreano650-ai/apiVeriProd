const express = require('express');
const router = express.Router();

const {
    registrarProducto,
    obtenerProductos,
    buscarProductoPorCodigo,
    actualizarProducto
} = require('../controllers/productos.controller');

// Registrar producto
router.post('/', registrarProducto);

// Listar productos
router.get('/', obtenerProductos);

// Buscar producto por código QR
router.get('/qr/:codigo', buscarProductoPorCodigo);

// Actualizar producto
router.put('/:id', actualizarProducto);

module.exports = router;