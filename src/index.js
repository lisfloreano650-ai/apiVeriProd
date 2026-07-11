require('dotenv').config();

const app = require('./app');
const pool = require('./config/db');

const PORT = process.env.PORT || 3000;

async function iniciarServidor() {

    try {

        const conexion = await pool.getConnection();

        console.log("=================================");
        console.log("✅ Conectado correctamente a MySQL");
        console.log("=================================");

        conexion.release();

        app.listen(PORT, () => {
            console.log(`Servidor ejecutándose en el puerto ${PORT}`);
        });

    } catch (error) {

        console.log("❌ Error al conectar con la base de datos");
        console.log(error);

    }

}

iniciarServidor();