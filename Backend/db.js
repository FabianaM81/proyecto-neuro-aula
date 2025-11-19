const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3307,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'proyecto',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Verificar conexión
pool
  .getConnection()
  .then(connection => {
    console.log('✅ Conexión exitosa con la base de datos MySQL');
    connection.release();
  })
  .catch(err => {
    console.error('❌ Error al conectar con la base de datos:', err.message);
    // process.exit(1); // Comentado para permitir que el servidor Express se inicie y manejar el error de conexión más tarde
  });

module.exports = pool;
