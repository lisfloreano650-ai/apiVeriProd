const express = require('express');
const router = express.Router();

const {
    registrarUsuario,
    loginUsuario,
    obtenerUsuarios
} = require('../controllers/usuarios.controller');

// Registrar usuario
router.post('/registro', registrarUsuario);

// Login
router.post('/login', loginUsuario);

// Obtener todos los usuarios
router.get('/', obtenerUsuarios);

module.exports = router;