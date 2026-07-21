const express = require('express');

const router = express.Router();


const {

    registrarUsuario,
    loginUsuario,
    obtenerUsuarios,
    eliminarUsuario,
    actualizarUsuario,
    recuperarPassword

} = require('../controllers/usuarios.controller');


// Registrar
router.post('/registro', registrarUsuario);

// Login
router.post('/login', loginUsuario);

// Listar usuarios
router.get('/', obtenerUsuarios);

// Actualizar usuario
router.put('/:id', actualizarUsuario);

// Eliminar usuario
router.delete('/:id', eliminarUsuario);

module.exports = router;