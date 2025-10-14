// Backend/db.js
const mysql = require('mysql2');
const conexion = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3307,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '1234',
  database: process.env.DB_NAME || 'proyecto',
});

conexion.connect((err) => {
  if (err) {
    console.error('❌ Error en la conexión con MySQL:', err);
    return;
  }
  console.log('✅ Conexión exitosa con la base de datos MySQL');
});

module.exports = conexion;

