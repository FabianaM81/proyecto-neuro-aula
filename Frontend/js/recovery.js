const API_BASE_URL = 'http://localhost:5000/api';

// Manejo del formulario de solicitud de recuperación
if (document.getElementById('forgotPasswordForm')) {
  document
    .getElementById('forgotPasswordForm')
    .addEventListener('submit', async e => {
      e.preventDefault();

      const email = document.getElementById('email').value;
      const mensaje = document.getElementById('mensaje');

      try {
        const response = await fetch(`${API_BASE_URL}/recuperacion/solicitar`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email })
        });

        const data = await response.json();

        if (response.ok) {
          mensaje.textContent = data.mensaje;
          mensaje.className = 'mensaje exito';
          document.getElementById('forgotPasswordForm').reset();
        } else {
          mensaje.textContent = data.mensaje;
          mensaje.className = 'mensaje error';
        }
      } catch (error) {
        mensaje.textContent = 'Error al enviar solicitud';
        mensaje.className = 'mensaje error';
      }
    });
}

// Manejo del formulario de restablecimiento de contraseña
if (document.getElementById('resetPasswordForm')) {
  document
    .getElementById('resetPasswordForm')
    .addEventListener('submit', async e => {
      e.preventDefault();

      const nuevaPassword = document.getElementById('nuevaPassword').value;
      const confirmarPassword =
        document.getElementById('confirmarPassword').value;
      const mensaje = document.getElementById('mensaje');

      // Validar que las contraseñas coincidan
      if (nuevaPassword !== confirmarPassword) {
        mensaje.textContent = 'Las contraseñas no coinciden';
        mensaje.className = 'mensaje error';
        return;
      }

      // Obtener token de la URL
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('token');

      if (!token) {
        mensaje.textContent = 'Token inválido';
        mensaje.className = 'mensaje error';
        return;
      }

      try {
        const response = await fetch(`${API_BASE_URL}/recuperacion/restablecer`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ token, nuevaPassword })
        });

        const data = await response.json();

        if (response.ok) {
          mensaje.textContent =
            data.mensaje + ' Serás redirigido al login...';
          mensaje.className = 'mensaje exito';
          setTimeout(() => {
            window.location.href = 'login.html';
          }, 2000);
        } else {
          mensaje.textContent = data.mensaje;
          mensaje.className = 'mensaje error';
        }
      } catch (error) {
        mensaje.textContent = 'Error al restablecer contraseña';
        mensaje.className = 'mensaje error';
      }
    });
}