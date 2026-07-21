const express = require('express');
const cors = require('cors');

const productosRoutes = require('./routes/productos.routes');
const usuariosRoutes = require('./routes/usuarios.routes');
const verificacionesRoutes = require('./routes/verificaciones.routes');
const reportesRoutes = require('./routes/reportes.routes');

const app = express();


// ==============================
// MIDDLEWARE
// ==============================

app.use(cors());


// Aumentamos tamaño permitido para fotografías
app.use(express.json({
    limit: '20mb'
}));

app.use(express.urlencoded({
    extended: true,
    limit: '20mb'
}));


// ==============================
// RUTAS
// ==============================

app.use('/api/usuarios', usuariosRoutes);

app.use('/api/productos', productosRoutes);

app.use('/api/verificaciones', verificacionesRoutes);

app.use('/api/reportes', reportesRoutes);


// ==============================
// RUTA PRINCIPAL
// ==============================

app.get('/', (req,res)=>{

    res.json({

        mensaje:'API VeriProd funcionando correctamente'

    });

});


module.exports = app;