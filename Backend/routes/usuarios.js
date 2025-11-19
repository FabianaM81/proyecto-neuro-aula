const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const conexion = require('../db');

router.post('/login', async (req, res) => {
  console.log('📥 LOGIN REQUEST RECIBIDO');
  console.log('Body:', req.body);

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      console.log('❌ Campos vacíos');
      return res.status(400).json({ 
        error: 'Email y contraseña son requeridos' 
      });
    }

    console.log('🔍 Buscando usuario:', email);

    const query = 'SELECT * FROM usuarios WHERE correo = ?';
    const [results] = await conexion.query(query, [email]);
    
    console.log('📊 Resultados encontrados:', results.length);

    if (results.length === 0) {
      console.log('❌ Usuario no encontrado');
      return res.status(401).json({ 
        error: 'Credenciales inválidas' 
      });
    }

    const usuario = results[0];
    console.log('✅ Usuario encontrado:', usuario.nombre);

    const passwordMatch = await bcrypt.compare(password, usuario.password);
    
    if (!passwordMatch) {
      console.log('❌ Contraseña incorrecta');
      return res.status(401).json({ 
        error: 'Credenciales inválidas' 
      });
    }

    console.log('✅ Contraseña correcta');

    const token = jwt.sign(
      { 
        id: usuario.id, 
        correo: usuario.correo, 
        id_rol: usuario.id_rol 
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    console.log('✅ Token generado');

    return res.status(200).json({
      message: 'Login exitoso',
      token: token,
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.correo,
        id_rol: usuario.id_rol
      }
    });

  } catch (error) {
    console.error('❌ Error inesperado:', error);
    return res.status(500).json({ 
      error: 'Error en el servidor',
      details: error.message 
    });
  }
});

router.post('/', async (req, res) => {
  console.log('📥 REGISTRO REQUEST RECIBIDO');
  console.log('Body:', req.body);

  try {
    const { nombre, email, password, telefono, id_rol } = req.body;

    if (!nombre || !email || !password) {
      return res.status(400).json({ 
        error: 'Nombre, email y contraseña son requeridos' 
      });
    }

    if (password.length < 6) {
      return res.status(400).json({ 
        error: 'La contraseña debe tener al menos 6 caracteres' 
      });
    }

    const checkQuery = 'SELECT * FROM usuarios WHERE correo = ?';
    const [checkResults] = await conexion.query(checkQuery, [email]);

    if (checkResults.length > 0) {
      return res.status(400).json({ 
        error: 'Este correo ya está registrado' 
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const insertQuery = 'INSERT INTO usuarios (nombre, correo, password, telefono, id_rol) VALUES (?, ?, ?, ?, ?)';
    const [result] = await conexion.query(insertQuery, [nombre, email, hashedPassword, telefono || null, id_rol || 2]);

    console.log('✅ Usuario creado exitosamente');
    
    return res.status(201).json({
      message: 'Usuario registrado exitosamente',
      usuario: {
        id: result.insertId,
        nombre,
        email,
        id_rol: id_rol || 2
      }
    });

  } catch (error) {
    console.error('❌ Error en registro:', error);
    return res.status(500).json({ 
      error: 'Error en el servidor',
      details: error.message 
    });
  }
});

router.get('/', async (req, res) => {
  console.log('📥 GET todos los usuarios');

  try {
    const query = 'SELECT u.id, u.nombre, u.correo, u.telefono, u.id_rol, r.nombre as nombre_rol FROM usuarios u LEFT JOIN roles r ON u.id_rol = r.id ORDER BY u.id DESC';
    const [results] = await conexion.query(query);

    console.log('✅ Usuarios obtenidos:', results.length);
    return res.json(results);

  } catch (error) {
    console.error('❌ Error obteniendo usuarios:', error);
    return res.status(500).json({ error: 'Error al obtener usuarios' });
  }
});

router.put('/:id', async (req, res) => {
  console.log('📥 UPDATE usuario:', req.params.id);

  try {
    const { id } = req.params;
    const { nombre, email, telefono, id_rol, password } = req.body;

    let query = 'UPDATE usuarios SET nombre = ?, correo = ?, telefono = ?, id_rol = ?';
    let params = [nombre, email, telefono || null, id_rol];

    if (password && password.trim() !== '') {
      const hashedPassword = await bcrypt.hash(password, 10);
      query += ', password = ?';
      params.push(hashedPassword);
    }

    query += ' WHERE id = ?';
    params.push(id);

    const [result] = await conexion.query(query, params);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    console.log('✅ Usuario actualizado');
    return res.json({ message: 'Usuario actualizado exitosamente' });

  } catch (error) {
    console.error('❌ Error:', error);
    return res.status(500).json({ error: 'Error en el servidor' });
  }
});

router.delete('/:id', async (req, res) => {
  console.log('📥 DELETE usuario:', req.params.id);

  try {
    const { id } = req.params;
    const query = 'DELETE FROM usuarios WHERE id = ?';
    const [result] = await conexion.query(query, [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    console.log('✅ Usuario eliminado');
    return res.json({ message: 'Usuario eliminado exitosamente' });

  } catch (error) {
    console.error('❌ Error eliminando usuario:', error);
    return res.status(500).json({ error: 'Error al eliminar usuario' });
  }
});

module.exports = router;