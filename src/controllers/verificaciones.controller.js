const pool = require('../config/db');

// Registrar una verificación
const registrarVerificacion = async (req, res) => {

    try {

        const {
            id_usuario,
            id_producto,
            resultado,
            ubicacion
        } = req.body;

        await pool.query(
            `INSERT INTO historial_verificaciones
            (
                id_usuario,
                id_producto,
                resultado,
                ubicacion
            )
            VALUES (?,?,?,?)`,
            [
                id_usuario,
                id_producto,
                resultado,
                ubicacion
            ]
        );

        res.status(201).json({
            mensaje: "Verificación registrada correctamente"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            mensaje: "Error del servidor"
        });

    }

};

// Obtener historial
const obtenerHistorial = async (req, res) => {

    try {

        const [historial] = await pool.query(`
            SELECT
                h.id_historial,
                u.nombre,
                u.apellido,
                p.nombre_producto,
                p.codigo_producto,
                h.resultado,
                h.ubicacion,
                h.fecha_verificacion
            FROM historial_verificaciones h
            LEFT JOIN usuarios u
                ON h.id_usuario = u.id_usuario
            LEFT JOIN productos p
                ON h.id_producto = p.id_producto
            ORDER BY h.fecha_verificacion DESC
        `);

        res.json(historial);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            mensaje: "Error del servidor"
        });

    }

};

module.exports = {
    registrarVerificacion,
    obtenerHistorial
};