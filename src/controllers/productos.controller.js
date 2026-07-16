const pool = require('../config/db');

// ==============================
// Registrar producto
// ==============================

const registrarProducto = async (req, res) => {

    try {

        const {
            codigo_producto,
            nombre_producto,
            marca,
            categoria,
            descripcion,
            fecha_fabricacion,
            fecha_caducidad,
            numero_lote,
            pais_origen,
            estado,
            imagen,
            id_proveedor
        } = req.body;

        const [existe] = await pool.query(
            'SELECT * FROM productos WHERE codigo_producto = ?',
            [codigo_producto]
        );

        if (existe.length > 0) {

            return res.status(400).json({
                mensaje: 'El código del producto ya existe'
            });

        }

        await pool.query(

            `INSERT INTO productos
            (
                codigo_producto,
                nombre_producto,
                marca,
                categoria,
                descripcion,
                fecha_fabricacion,
                fecha_caducidad,
                numero_lote,
                pais_origen,
                estado,
                imagen,
                id_proveedor
            )
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`,

            [
                codigo_producto,
                nombre_producto,
                marca,
                categoria,
                descripcion,
                fecha_fabricacion,
                fecha_caducidad,
                numero_lote,
                pais_origen,
                estado,
                imagen,
                id_proveedor
            ]

        );

        res.status(201).json({
            mensaje: 'Producto registrado correctamente'
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            mensaje: 'Error del servidor'
        });

    }

};

// ==============================
// Listar productos
// ==============================

const obtenerProductos = async (req, res) => {

    try {

        const [productos] = await pool.query(
            'SELECT * FROM productos'
        );

        res.json(productos);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            mensaje: 'Error del servidor'
        });

    }

};

// ==============================
// Buscar producto por código
// ==============================

const buscarProductoPorCodigo = async (req, res) => {

    try {

        const { codigo } = req.params;

        const [producto] = await pool.query(
            'SELECT * FROM productos WHERE codigo_producto = ?',
            [codigo]
        );

        if (producto.length === 0) {

            return res.status(404).json({
                mensaje: 'Producto no encontrado'
            });

        }

        res.json(producto[0]);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            mensaje: 'Error del servidor'
        });

    }

};

// ==============================
// Actualizar producto
// ==============================

const actualizarProducto = async (req, res) => {

    try {

        const { id } = req.params;

        const {
            codigo_producto,
            nombre_producto,
            marca,
            categoria,
            descripcion,
            fecha_fabricacion,
            fecha_caducidad,
            numero_lote,
            pais_origen,
            estado
        } = req.body;

        await pool.query(

            `UPDATE productos SET

                codigo_producto=?,
                nombre_producto=?,
                marca=?,
                categoria=?,
                descripcion=?,
                fecha_fabricacion=?,
                fecha_caducidad=?,
                numero_lote=?,
                pais_origen=?,
                estado=?

            WHERE id_producto=?`,

            [
                codigo_producto,
                nombre_producto,
                marca,
                categoria,
                descripcion,
                fecha_fabricacion,
                fecha_caducidad,
                numero_lote,
                pais_origen,
                estado,
                id
            ]

        );

        res.json({
            mensaje: 'Producto actualizado correctamente'
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            mensaje: 'Error del servidor'
        });

    }

};

// ==============================
// Eliminar producto
// ==============================

const eliminarProducto = async (req, res) => {

    try {

        const { id } = req.params;

        await pool.query(
            'DELETE FROM productos WHERE id_producto = ?',
            [id]
        );

        res.json({
            mensaje: 'Producto eliminado correctamente'
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            mensaje: 'Error del servidor'
        });

    }

};

// ==============================

module.exports = {
    registrarProducto,
    obtenerProductos,
    buscarProductoPorCodigo,
    actualizarProducto,
    eliminarProducto
};