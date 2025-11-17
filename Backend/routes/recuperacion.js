const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

// Configurar transporter de nodemailer con variables de entorno
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

// Ruta para solicitar recuperación de contraseña
router.post('/solicitar', async (req, res) => {
  const { email } = req.body;

  try {
    // Verificar si el usuario existe
    const [usuarios] = await db.query('SELECT * FROM usuarios WHERE correo = ?', [email]);

    if (usuarios.length === 0) {
      return res.status(404).json({ mensaje: 'No existe un usuario con ese correo' });
    }

    // Generar token único
    const token = crypto.randomBytes(32).toString('hex');
    const expiracion = new Date(Date.now() + 3600000); // 1 hora

    // Guardar token en la base de datos
    await db.query(
      'UPDATE usuarios SET reset_token = ?, reset_token_exp = ? WHERE correo = ?',
      [token, expiracion, email]
    );

    // Crear enlace de recuperación
    const enlaceRecuperacion = `http://localhost:5000/reset-password.html?token=${token}`;

    // Enviar correo
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Recuperación de Contraseña - NeuroAula',
      html: `
        <h2>Recuperación de Contraseña</h2>
        <p>Has solicitado restablecer tu contraseña.</p>
        <p>Haz clic en el siguiente enlace para crear una nueva contraseña:</p>
        <a href="${enlaceRecuperacion}">${enlaceRecuperacion}</a>
        <p>Este enlace expirará en 1 hora.</p>
        <p>Si no solicitaste este cambio, ignora este correo.</p>
      `
    });

    res.json({ mensaje: 'Correo de recuperación enviado exitosamente' });
  } catch (error) {
    console.error('Error al solicitar recuperación:', error);
    res.status(500).json({ mensaje: 'Error al procesar la solicitud' });
  }
});

// Ruta para restablecer contraseña con token
router.post('/restablecer', async (req, res) => {
  const { token, nuevaPassword } = req.body;

  try {
    // Buscar usuario con el token válido
    const [usuarios] = await db.query(
      'SELECT * FROM usuarios WHERE reset_token = ? AND reset_token_exp > NOW()',
      [token]
    );

    if (usuarios.length === 0) {
      return res.status(400).json({ mensaje: 'Token inválido o expirado' });
    }

    // Hashear nueva contraseña
    const hashedPassword = await bcrypt.hash(nuevaPassword, 10);

    // Actualizar contraseña y limpiar token
    await db.query(
      'UPDATE usuarios SET password = ?, reset_token = NULL, reset_token_exp = NULL WHERE id_usuario = ?',
      [hashedPassword, usuarios[0].id_usuario]
    );

    res.json({ mensaje: 'Contraseña actualizada exitosamente' });
  } catch (error) {
    console.error('Error al restablecer contraseña:', error);
    res.status(500).json({ mensaje: 'Error al restablecer la contraseña' });
  }
});

module.exports = router;