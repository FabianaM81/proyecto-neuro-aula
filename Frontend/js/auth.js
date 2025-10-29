// auth.js - Maneja login, registro y protección de rutas

// ========================================
// MANEJO DEL LOGIN
// ========================================
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();

      if (!email || !password) {
        alert("Por favor completa todos los campos.");
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/api/usuarios/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("nombreUsuario", data.usuario.nombre);
          localStorage.setItem("id_rol", data.usuario.id_rol);
          let rolTexto = "estudiante";  // Por defecto
          if (data.usuario.id_rol === 1) rolTexto = "profesor";
          else if (data.usuario.id_rol === 3) rolTexto = "administrador";
          localStorage.setItem("userRole", rolTexto);

          alert("✅ Inicio de sesión exitoso. Bienvenido/a, " + data.usuario.nombre);
          window.location.href = "../html/resources.html";
        } else {
          alert("❌ Error: " + (data.error || data.message));
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
        alert("Hubo un problema al conectar con el servidor.");
      }
    });
  }
});

// ========================================
// MANEJO DEL REGISTRO
// ========================================
document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.querySelector(".registration-form");
  
  if (registerForm) {
    // Validación visual en tiempo real
    const passwordInput = document.getElementById("password");
    const confirmInput = document.getElementById("confirm-password");

    confirmInput.addEventListener("input", () => {
      const errorMsg = document.getElementById("password-error");
      if (confirmInput.value !== passwordInput.value) {
        confirmInput.style.borderColor = "red";
        errorMsg.style.display = "block";
      } else {
        confirmInput.style.borderColor = "green";
        errorMsg.style.display = "none";
      }
    });

    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const nombre = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();
      const confirmPassword = document.getElementById("confirm-password").value.trim();
      const telefono = document.getElementById("telefono").value.trim();
      const id_rol = document.getElementById("rol").value;

      if (password !== confirmPassword) {
        alert("Las contraseñas no coinciden");
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/api/usuarios", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nombre, email, password, telefono, id_rol }),
        });

        const data = await response.json();

        if (response.ok) {
          alert("✅ Registro exitoso. Ahora puedes iniciar sesión.");
          registerForm.reset();
          window.location.href = "login.html";
        } else {
          alert("❌ Error: " + (data.error || data.message));
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
        alert("Hubo un problema al conectar con el servidor.");
      }
    });
  }
});

// ========================================
// PROTECCIÓN DE RUTAS
// ========================================
(function () {
  const currentPage = window.location.pathname.split("/").pop();
  const isPublicPage = ["login.html", "register.html", "index.html"].includes(currentPage);

  if (!isPublicPage) {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("⚠️ Debes iniciar sesión para acceder a esta página.");
      window.location.href = "login.html";
    }
  }
})();