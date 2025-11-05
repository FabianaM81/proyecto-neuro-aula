// Backend/db.js
require('dotenv').config();
const mysql = require('mysql2');

const conexion = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

conexion.connect((err) => {
  if (err) {
    console.error('❌ Error crítico en la conexión con MySQL:', err.message);
    console.error('💡 Verifica tu archivo .env y que MySQL esté ejecutándose');
    console.error('🛑 La aplicación no puede continuar sin base de datos');
    process.exit(1); // Salir de la aplicación con código de error
  }
  console.log('✅ Conexión exitosa con la base de datos MySQL');
});

module.exports = conexion;

