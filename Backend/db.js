// Backend/db.js
require('dotenv').config();
const mysql = require('mysql2');

// Crear pool de conexiones (más eficiente que una sola conexión)
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Verificar conexión al iniciar
pool.getConnection((err, connection) => {
  if (err) {
    console.error('❌ Error crítico en la conexión con MySQL:', err.message);
    console.error('💡 Verifica tu archivo .env y que MySQL esté ejecutándose');
    console.error('🛑 La aplicación no puede continuar sin base de datos');
    process.exit(1);
  }
  console.log('✅ Conexión exitosa con la base de datos MySQL');
  connection.release();
});

module.exports = pool;
