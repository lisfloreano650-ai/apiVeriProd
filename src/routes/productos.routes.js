const express = require('express');
const router = express.Router();

const {
    registrarProducto,
    obtenerProductos,
    buscarProductoPorCodigo,
    actualizarProducto,
    eliminarProducto
} = require('../controllers/productos.controller');

// Registrar producto
router.post('/', registrarProducto);

// Listar productos
router.get('/', obtenerProductos);

// Buscar producto por código QR
router.get('/qr/:codigo', buscarProductoPorCodigo);

// Actualizar producto
router.put('/:id', actualizarProducto);

// Eliminar producto
router.delete('/:id', eliminarProducto);

module.exports = router;