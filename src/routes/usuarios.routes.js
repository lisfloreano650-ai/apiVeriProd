const express = require('express');
const router = express.Router();

const {
    registrarUsuario,
    loginUsuario
} = require('../controllers/usuarios.controller');

// Registro
router.post('/registro', registrarUsuario);

// Login
router.post('/login', loginUsuario);

module.exports = router;