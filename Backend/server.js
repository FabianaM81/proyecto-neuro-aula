require("dotenv").config(); 

// Validar JWT_SECRET
if (!process.env.JWT_SECRET) {
  console.error('🚨 ERROR CRÍTICO: JWT_SECRET no definida en .env');
  console.error('❌ La aplicación no puede iniciar de forma segura.');
  throw new Error('JWT_SECRET no definida en .env - La autenticación no puede funcionar');
}

const express = require("express");          
const cors = require("cors");
const chalk = require("chalk");
const conexion = require("./db");
const userRoutes = require('./routes/usuarios');
const authMiddleware = require('./middleware/authMiddleware');
const recuperacionRoutes = require('./routes/recuperacion');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(cors());

// Rutas
app.use('/api/usuarios', userRoutes);
app.use('/api/recuperacion', recuperacionRoutes);

// Ruta protegida para obtener datos del usuario autenticado
app.get("/api/me", authMiddleware, (req, res) => {
  conexion.query(
    "SELECT id, nombre, correo FROM usuarios WHERE id = ?", 
    [req.user.id], 
    (err, resultados) => {
      if (err) {
        return res.status(500).json({ error: "Error en la base de datos" });
      }
      if (resultados.length === 0) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }
      res.json(resultados[0]);
    }
  );
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(chalk.blue.bold(`🚀 Servidor NeuroAula corriendo en http://localhost:${PORT}`));
  console.log(chalk.green.bold("✅ Listo para recibir peticiones"));
});
