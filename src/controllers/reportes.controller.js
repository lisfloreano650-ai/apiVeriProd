const pool = require('../config/db');

// ==============================
// Registrar reporte
// ==============================

const registrarReporte = async (req, res) => {

    try {

        const {
            id_usuario,
            id_producto,
            motivo,
            descripcion,
            evidencia
        } = req.body;

        await pool.query(

            `INSERT INTO reportes
            (
                id_usuario,
                id_producto,
                motivo,
                descripcion,
                evidencia
            )
            VALUES (?,?,?,?,?)`,

            [
                id_usuario,
                id_producto,
                motivo,
                descripcion,
                evidencia
            ]

        );

        res.status(201).json({
            mensaje: 'Reporte registrado correctamente'
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            mensaje: 'Error del servidor'
        });

    }

};

// ==============================
// Obtener reportes
// ==============================

const obtenerReportes = async (req, res) => {

    try {

        const [reportes] = await pool.query(`
            SELECT
                r.*,
                u.nombre,
                u.apellido,
                p.nombre_producto
            FROM reportes r
            LEFT JOIN usuarios u
                ON r.id_usuario = u.id_usuario
            LEFT JOIN productos p
                ON r.id_producto = p.id_producto
            ORDER BY r.fecha_reporte DESC
        `);

        res.json(reportes);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            mensaje: 'Error del servidor'
        });

    }

};

// ==============================
// ACTUALIZAR ESTADO DEL REPORTE
// ==============================

const actualizarEstadoReporte = async (req, res) => {

    try {

        const { id } = req.params;
        const { estado } = req.body;

        await pool.query(

            `UPDATE reportes
             SET estado=?
             WHERE id_reporte=?`,

            [
                estado,
                id
            ]

        );

        res.json({
            mensaje: 'Estado actualizado correctamente'
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            mensaje: 'Error del servidor'
        });

    }

};

module.exports = {
    registrarReporte,
    obtenerReportes,
    actualizarEstadoReporte
};