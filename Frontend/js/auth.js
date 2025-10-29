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

          // Redirigir según el rol
          if (data.usuario.id_rol === 3) {
            // Administrador va a gestión de usuarios
            window.location.href = "../html/user_management.html";
          } else {
            // Profesores y estudiantes van a recursos
            window.location.href = "../html/resources.html";
          }
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

// ========================================
// AGREGAR ENLACE DE GESTIÓN PARA ADMINS
// ========================================
document.addEventListener("DOMContentLoaded", () => {
  const idRol = localStorage.getItem("id_rol");
  
  // Si es administrador (id_rol = 3)
  if (idRol === "3") {
    const navLinks = document.querySelector(".nav-links");
    
    if (navLinks) {
      // Verificar si ya existe el enlace
      const existingLink = Array.from(navLinks.querySelectorAll("a")).find(
        a => a.getAttribute("href") === "user_management.html"
      );
      
      // Si no existe, agregarlo antes del enlace de Login
      if (!existingLink) {
        const loginLink = Array.from(navLinks.children).find(
          li => li.querySelector('a[href*="login"]')
        );
        
        if (loginLink) {
          const li = document.createElement("li");
          li.innerHTML = '<a href="user_management.html">Gestión de Usuarios</a>';
          navLinks.insertBefore(li, loginLink);
        }
      }
    }
  }
});