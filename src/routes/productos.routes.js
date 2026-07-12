const express = require('express');
const router = express.Router();

const {
    registrarProducto,
    obtenerProductos
} = require('../controllers/productos.controller');

router.post('/', registrarProducto);
router.get('/', obtenerProductos);

module.exports = router;