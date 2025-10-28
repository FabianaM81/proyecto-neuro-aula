require("dotenv").config(); 
if (!process.env.JWT_SECRET) {
  console.error('🚨 ERROR CRÍTICO: JWT_SECRET no definida en .env');
  console.error('❌ La aplicación no puede iniciar de forma segura.');
  throw new Error('JWT_SECRET no definida en .env - La autenticación no puede funcionar');
}
const express = require("express");          
const cors = require("cors");                
const mysql = require("mysql2");
const path = require("path");
const conexion = require("./db");            
const app = express();
const userRoutes = require('./routes/usuarios');
const authMiddleware = require('./middleware/authMiddleware');
const chalk = require("chalk");
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cors());
app.use('/html', express.static(path.join(__dirname, '../Frontend/html')));
app.use('/api/usuarios', userRoutes);

// Bloque de login redundante eliminado (ahora gestionado desde routes/usuarios.js)

// Middleware para verificar token
/*
function verificarToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(403).json({ error: "Token no proporcionado" });
  }

  const token = authHeader.split(" ")[1]; // "Bearer <token>"

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Token inválido o expirado" });
    }
    req.user = decoded;
    next();
  });
}
*/

// Ruta protegida
app.get("/api/me", authMiddleware, (req, res) => {
  conexion.query("SELECT id, nombre, correo FROM usuarios WHERE id = ?", [req.user.id], (err, resultados) => {
    if (err) {
      return res.status(500).json({ error: "Error en la base de datos" });
    }
    if (resultados.length === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.json(resultados[0]);
  });
});

// 🔒 Duplicado desactivado: /api/login ahora se maneja en routes/usuarios.js

// Middleware para proteger rutas
/*
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"] || req.headers["Authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Token no proporcionado" });

  jwt.verify(token, process.env.JWT_SECRET || "dev_secret", (err, decoded) => {
    if (err) return res.status(401).json({ error: "Token inválido" });
    req.user = decoded; // { id, email, iat, exp }
    next();
  });
}
*/

// ---------- fin autenticación ----------

app.listen(PORT, () => {
  console.log(chalk.blue.bold(`🚀 Servidor NeuroAula corriendo en http://localhost:${PORT}`));
  console.log(chalk.green.bold("✅ Conexión exitosa con la base de datos MySQL"));
});

