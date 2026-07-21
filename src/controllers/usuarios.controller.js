const pool = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// ==============================
// REGISTRAR USUARIO
// ==============================

const registrarUsuario = async (req, res) => {

    try {

        const {
            nombre,
            apellido,
            correo,
            password
        } = req.body;

        const rol = 'Usuario';

        const [existe] = await pool.query(
            'SELECT * FROM usuarios WHERE correo = ?',
            [correo]
        );

        if (existe.length > 0) {

            return res.status(400).json({
                mensaje: 'El correo ya está registrado'
            });

        }

        const passwordHash = await bcrypt.hash(password, 10);

        await pool.query(

            `INSERT INTO usuarios
            (nombre, apellido, correo, password, rol)
            VALUES (?,?,?,?,?)`,

            [
                nombre,
                apellido,
                correo,
                passwordHash,
                rol
            ]

        );

        res.status(201).json({
            mensaje: 'Usuario registrado correctamente'
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            mensaje: 'Error del servidor'
        });

    }

};

// ==============================
// LOGIN
// ==============================

const loginUsuario = async (req, res) => {

    try {

        const { correo, password } = req.body;

        const [usuarios] = await pool.query(

            'SELECT * FROM usuarios WHERE correo = ?',

            [correo]

        );

        if (usuarios.length === 0) {

            return res.status(404).json({
                mensaje: 'Usuario no encontrado'
            });

        }

        const usuario = usuarios[0];

        const coincide = await bcrypt.compare(
            password,
            usuario.password
        );

        if (!coincide) {

            return res.status(401).json({
                mensaje: 'Contraseña incorrecta'
            });

        }

        const token = jwt.sign(

            {
                id: usuario.id_usuario,
                correo: usuario.correo,
                rol: usuario.rol
            },

            'veriprod2026',

            {
                expiresIn: '8h'
            }

        );

        res.json({

            mensaje: 'Login correcto',
            token,
            usuario

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            mensaje: 'Error del servidor'
        });

    }

};

// ==============================
// OBTENER USUARIOS
// ==============================

const obtenerUsuarios = async (req, res) => {

    try {

        const [usuarios] = await pool.query(

            `SELECT
                id_usuario,
                nombre,
                apellido,
                correo,
                rol
            FROM usuarios
            ORDER BY nombre`

        );

        res.json(usuarios);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            mensaje: 'Error del servidor'
        });

    }

};

// ==============================
// ELIMINAR USUARIO
// ==============================

const eliminarUsuario = async (req, res) => {

    try {

        const { id } = req.params;

        await pool.query(
            'DELETE FROM usuarios WHERE id_usuario = ?',
            [id]
        );

        res.json({
            mensaje: 'Usuario eliminado correctamente'
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            mensaje: 'Error del servidor'
        });

    }

};

// ==============================
// ACTUALIZAR USUARIO
// ==============================

const actualizarUsuario = async (req, res) => {

    try {

        const { id } = req.params;

        const {
            nombre,
            apellido,
            correo,
            rol
        } = req.body;

        await pool.query(

            `UPDATE usuarios SET
                nombre=?,
                apellido=?,
                correo=?,
                rol=?
            WHERE id_usuario=?`,

            [
                nombre,
                apellido,
                correo,
                rol,
                id
            ]

        );

        res.json({
            mensaje: 'Usuario actualizado correctamente'
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            mensaje: 'Error del servidor'
        });

    }

};

// ==============================
// RECUPERAR CONTRASEÑA
// ==============================

const recuperarPassword = async (req, res) => {

    try {

        const {
            correo,
            nuevaPassword
        } = req.body;


        const [usuarios] = await pool.query(

            'SELECT * FROM usuarios WHERE correo=?',

            [correo]

        );


        if (usuarios.length === 0) {

            return res.status(404).json({

                mensaje: 'El correo no existe'

            });

        }


        const passwordHash = await bcrypt.hash(

            nuevaPassword,

            10

        );


        await pool.query(

            `UPDATE usuarios
             SET password=?
             WHERE correo=?`,

            [

                passwordHash,
                correo

            ]

        );


        res.json({

            mensaje:'Contraseña actualizada correctamente'

        });



    } catch(error) {


        console.log(error);


        res.status(500).json({

            mensaje:'Error del servidor'

        });


    }

};



// ==============================
// EXPORTAR
// ==============================

module.exports = {

    registrarUsuario,
    loginUsuario,
    obtenerUsuarios,
    eliminarUsuario,
    actualizarUsuario,
    recuperarPassword

};