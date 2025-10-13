const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    port: 3307,
    user: "root",
    password: "admin",
    database: "proyecto"
});

db.connect((err) => {
    if (err) {
        console.log("Error conectando a la BD:", err);
        return;
    }
    console.log("Conectado a la base de datos MySQL");
});

app.post("/api/usuarios", (req, res) => {
    const { nombre, email, password } = req.body;

    if (!nombre || !email || !password) {
        return res.status(400).json({ error: "Nombre, email y contraseña son requeridos" });
    }

    db.query(
        "INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)",
        [nombre, email, password],
        (err, resultado) => {
            if (err) {
                console.error("Error en query:", err);
                return res.status(500).json({ error: err.sqlMessage });
            }

            res.json({
                message: "Usuario creado exitosamente",
                id: resultado.insertId,
                nombre,
                email,
                password
            });
        }
    );
});  

app.get("/api/usuarios", (req, res) => {
    db.query("SELECT * FROM usuarios", (err, resultados) => {
        if (err) return res.status(500).json({
            error: "Error en la base de datos"
        });
        res.json(resultados);
    });
});

// Ruta de prueba — confirma que el servidor responde
app.get("/api/test", (req, res) => {
  res.json({ message: "✅ API funcionando correctamente - NeuroAula" });
});


const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

// Obtener un usuario por id
app.get("/api/usuarios/:id", (req, res) => {
    const { id } = req.params;

    db.query("SELECT * FROM usuarios WHERE id = ?", [id], (err, resultado) => {
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

// Actualizar un usuario
app.put("/api/usuarios/:id", (req, res) => {
    const { id } = req.params;
    const { nombre, email, password } = req.body;

    db.query(
        "UPDATE usuarios SET nombre = ?, email = ?, password = ? WHERE id = ?",
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

// Eliminar un usuario
app.delete("/api/usuarios/:id", (req, res) => {
    const { id } = req.params;

    db.query("DELETE FROM usuarios WHERE id = ?", [id], (err, resultado) => {
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
