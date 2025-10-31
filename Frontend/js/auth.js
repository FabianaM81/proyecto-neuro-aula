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
    const errorMsg = document.getElementById("password-error");

    // Validación de longitud mínima en tiempo real
    passwordInput.addEventListener("input", () => {
      const password = passwordInput.value;
      
      if (password.length > 0 && password.length < 6) {
        passwordInput.style.borderColor = "red";
        errorMsg.textContent = "La contraseña debe tener al menos 6 caracteres";
        errorMsg.style.display = "block";
      } else {
        passwordInput.style.borderColor = "";
        if (confirmInput.value === "" || confirmInput.value === password) {
          errorMsg.style.display = "none";
        }
      }
      
      if (confirmInput.value.length > 0) {
        validatePasswordMatch();
      }
    });

    confirmInput.addEventListener("input", validatePasswordMatch);

    function validatePasswordMatch() {
      const password = passwordInput.value;
      const confirmPassword = confirmInput.value;
      
      if (password.length < 6) {
        passwordInput.style.borderColor = "red";
        errorMsg.textContent = "La contraseña debe tener al menos 6 caracteres";
        errorMsg.style.display = "block";
        return;
      }
      
      if (confirmPassword !== password) {
        confirmInput.style.borderColor = "red";
        errorMsg.textContent = "Las contraseñas no coinciden";
        errorMsg.style.display = "block";
      } else {
        confirmInput.style.borderColor = "green";
        passwordInput.style.borderColor = "green";
        errorMsg.style.display = "none";
      }
    }

    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const nombre = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();
      const confirmPassword = document.getElementById("confirm-password").value.trim();
      const telefono = document.getElementById("telefono").value.trim();
      const id_rol = document.getElementById("rol").value;

      // Validación de longitud mínima antes de enviar
      if (password.length < 6) {
        errorMsg.textContent = "La contraseña debe tener al menos 6 caracteres";
        errorMsg.style.display = "block";
        passwordInput.style.borderColor = "red";
        passwordInput.focus();
        return;
      }

      // Validación de coincidencia
      if (password !== confirmPassword) {
        errorMsg.textContent = "Las contraseñas no coinciden";
        errorMsg.style.display = "block";
        confirmInput.style.borderColor = "red";
        confirmInput.focus();
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
  const token = localStorage.getItem("token");
  const idRol = localStorage.getItem("id_rol");
  const currentPage = window.location.pathname.split("/").pop();
  
  // Páginas donde NO debe aparecer (solo login y registro)
  const publicPages = ["login.html", "register.html"];
  
  // Solo agregar si está logueado, es admin Y NO está en login/registro
  if (token && idRol === "3" && !publicPages.includes(currentPage)) {
    const navLinks = document.querySelector(".nav-links");
    
    if (navLinks) {
      // Verificar si ya existe el enlace
      const existingLink = Array.from(navLinks.querySelectorAll("a")).find(
        a => a.href.includes("user_management.html")
      );
      
      if (!existingLink) {
        // Detectar si estamos en la raíz (index.html) o en /html/
        const isInRoot = currentPage === "index.html" || currentPage === "";
        const href = isInRoot ? "html/user_management.html" : "user_management.html";
        
        // Buscar el enlace de Login para insertar antes
        const loginLink = Array.from(navLinks.children).find(
          li => li.querySelector('a[href*="login"]')
        );
        
        if (loginLink) {
          const li = document.createElement("li");
          li.innerHTML = `<a href="${href}">Gestión de Usuarios</a>`;
          navLinks.insertBefore(li, loginLink);
        }
      }
    }
  }
});

// ========================================
// LÓGICA DE MENÚ MÓVIL
// ========================================
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }
});