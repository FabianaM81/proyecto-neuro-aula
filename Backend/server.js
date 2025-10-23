require("dotenv").config(); 
if (!process.env.JWT_SECRET) console.warn('⚠️  JWT_SECRET no definida en .env - la autenticación podría fallar');
const express = require("express");          
const cors = require("cors");                
const mysql = require("mysql2");
const path = require("path");
const conexion = require("./db");            
const app = express();
const userRoutes = require('./routes/usuarios');
const authMiddleware = require('./middleware/authMiddleware');
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

// Obtener todos los usuarios
app.get("/api/usuarios", (req, res) => {
  conexion.query("SELECT * FROM usuarios", (err, resultados) => {
    if (err) {
      return res.status(500).json({ error: "Error en la base de datos" });
    }
    res.json(resultados);
  });
});

// Obtener usuario por ID
app.get("/api/usuarios/:id", (req, res) => {
  const { id } = req.params;

  conexion.query("SELECT * FROM usuarios WHERE id = ?", [id], (err, resultado) => {
    if (err) {
      console.error("Error en SELECT:", err);
      return res.status(500).json({ error: err.sqlMessage });
    }
    if (resultado.length === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.json(resultado[0]);
  });
});

// Actualizar usuario
app.put("/api/usuarios/:id", (req, res) => {
  const { id } = req.params;
  const { nombre, email, password } = req.body;

  conexion.query(
    "UPDATE usuarios SET nombre = ?, correo = ?, password = ? WHERE id = ?",
    [nombre, email, password, id],
    (err, resultado) => {
      if (err) {
        console.error("Error en UPDATE:", err);
        return res.status(500).json({ error: err.sqlMessage });
      }
      if (resultado.affectedRows === 0) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }
      res.json({ message: "Usuario actualizado exitosamente" });
    }
  );
});

// Eliminar usuario
app.delete("/api/usuarios/:id", (req, res) => {
  const { id } = req.params;

  conexion.query("DELETE FROM usuarios WHERE id = ?", [id], (err, resultado) => {
    if (err) {
      console.error("Error en DELETE:", err);
      return res.status(500).json({ error: err.sqlMessage });
    }
    if (resultado.affectedRows === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.json({ message: "Usuario eliminado exitosamente" });
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

// Ruta protegida de ejemplo — devuelve info del usuario autenticado
app.get("/api/me", authMiddleware, (req, res) => {
  const userId = req.user.id;
  conexion.query("SELECT id, nombre, correo, creado_en FROM usuarios WHERE id = ?", [userId], (err, results) => {
    if (err) return res.status(500).json({ error: "Error en la base de datos" });
    if (results.length === 0) return res.status(404).json({ error: "Usuario no encontrado" });
    res.json(results[0]);
  });
});
// ---------- fin autenticación ----------

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
