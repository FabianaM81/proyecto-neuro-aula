const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const conexion = require('../db');
const authMiddleware = require('../middleware/authMiddleware');

// Ruta para crear un nuevo usuario
router.post(
  '/',
  [
    body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
    body('email').isEmail().withMessage('Debe ser un correo válido'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('La contraseña debe tener al menos 6 caracteres'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errores: errors.array() });
    }

    const { nombre, email, password, telefono, id_rol } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    conexion.query(
      'INSERT INTO usuarios (nombre, correo, password, telefono, id_rol) VALUES (?, ?, ?, ?, ?)',
      [nombre, email, hashedPassword, telefono || null, id_rol || 2],
      (err, resultado) => {
        if (err) {
          console.error('❌ Error en query:', err);
          if (err.code === 'ER_DUP_ENTRY') {
            console.log('⚠️ Duplicado detectado (correo o teléfono existente)');
            return res.status(400).json({ error: 'El correo o el teléfono ya están registrados' });
          }
          return res.status(500).json({ error: 'Error interno del servidor' });
        }
      
        res.status(201).json({
          message: 'Usuario creado exitosamente',
          id: resultado.insertId,
          nombre,
          email,
          telefono,
          id_rol: id_rol || 2
        });
      }
    );
  }
);

// Ruta para el login de usuario
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email y contraseña son requeridos' });
  }

  conexion.query('SELECT * FROM usuarios WHERE correo = ?', [email], async (err, resultados) => {
    if (err) {
      console.error('Error en SELECT:', err);
      return res.status(500).json({ error: 'Error en el servidor' });
    }

    if (resultados.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const usuario = resultados[0];

    const passwordValida = await bcrypt.compare(password, usuario.password);
    if (!passwordValida) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    const token = jwt.sign(
      { id: usuario.id, correo: usuario.correo },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      message: 'Inicio de sesión exitoso',
      token,
      usuario: { id: usuario.id, nombre: usuario.nombre, correo: usuario.correo, id_rol: usuario.id_rol },
    });
  });
});

// Ruta protegida para obtener datos del usuario autenticado
router.get('/me', authMiddleware, (req, res) => {
  conexion.query(
    'SELECT id, nombre, correo, id_rol FROM usuarios WHERE id = ?',
    [req.user.id],
    (err, resultados) => {
      if (err) {
        console.error('Error al obtener datos del usuario:', err);
        return res.status(500).json({ error: 'Error interno del servidor' });
      }

      if (resultados.length === 0) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      res.json(resultados[0]);
    }
  );
});

// Obtener todos los usuarios (protegida)
router.get('/', authMiddleware, (req, res) => {
  conexion.query('SELECT id, nombre, correo, id_rol FROM usuarios', (err, resultados) => {
    if (err) {
      console.error('Error al obtener usuarios:', err);
      return res.status(500).json({ error: 'Error en la base de datos' });
    }
    res.json(resultados);
  });
});

// Obtener usuario por ID (protegida)
router.get('/:id', authMiddleware, (req, res) => {
  const { id } = req.params;

  conexion.query('SELECT id, nombre, correo, id_rol FROM usuarios WHERE id = ?', [id], (err, resultado) => {
    if (err) {
      console.error('Error en SELECT:', err);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
    if (resultado.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json(resultado[0]);
  });
});

// Actualizar usuario (protegida)
router.put('/:id', authMiddleware, (req, res) => {
  const { id } = req.params;
  const { nombre, email, password, id_rol } = req.body;

  let updateFields = [];
  let updateValues = [];

  if (nombre) { updateFields.push('nombre = ?'); updateValues.push(nombre); }
  if (email) { updateFields.push('correo = ?'); updateValues.push(email); }
  if (password) { 
    const hashedPassword = bcrypt.hashSync(password, 10);
    updateFields.push('password = ?'); updateValues.push(hashedPassword); 
  }
  if (id_rol) { updateFields.push('id_rol = ?'); updateValues.push(id_rol); }

  if (updateFields.length === 0) {
    return res.status(400).json({ message: 'No hay campos para actualizar' });
  }

  const query = `UPDATE usuarios SET ${updateFields.join(', ')} WHERE id = ?`;
  updateValues.push(id);

  conexion.query(query, updateValues, (err, resultado) => {
    if (err) {
      console.error('Error en UPDATE:', err);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
    if (resultado.affectedRows === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json({ message: 'Usuario actualizado exitosamente' });
  });
});

// Eliminar usuario (protegida)
router.delete('/:id', authMiddleware, (req, res) => {
  const { id } = req.params;

  conexion.query('DELETE FROM usuarios WHERE id = ?', [id], (err, resultado) => {
    if (err) {
      console.error('Error en DELETE:', err);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
    if (resultado.affectedRows === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json({ message: 'Usuario eliminado exitosamente' });
  });
});

module.exports = router;