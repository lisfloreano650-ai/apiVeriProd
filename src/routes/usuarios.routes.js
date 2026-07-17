const express = require('express');
const router = express.Router();

const {
    registrarUsuario,
    loginUsuario,
    obtenerUsuarios,
    eliminarUsuario
} = require('../controllers/usuarios.controller');

// Registrar usuario
router.post('/registro', registrarUsuario);

// Login
router.post('/login', loginUsuario);

// Obtener usuarios
router.get('/', obtenerUsuarios);

// Eliminar usuario
router.delete('/:id', eliminarUsuario);

module.exports = router;