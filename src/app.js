const express = require('express');
const cors = require('cors');
const productosRoutes = require('./routes/productos.routes');
const usuariosRoutes = require('./routes/usuarios.routes');
const verificacionesRoutes = require('./routes/verificaciones.routes');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/productos', productosRoutes);
app.use('/api/verificaciones', verificacionesRoutes);
// Ruta principal
app.get('/', (req, res) => {
    res.json({
        mensaje: 'API VeriProd funcionando correctamente'
    });
});

module.exports = app;