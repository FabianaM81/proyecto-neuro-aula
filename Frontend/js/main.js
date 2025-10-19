// main.js (maneja el login)
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  if (!form) return; // evita errores si no estamos en login.html

  form.addEventListener("submit", async (e) => {
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
        body: JSON.stringify({ correo, password }),
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("nombreUsuario", data.usuario.nombre);
            alert("✅ Inicio de sesión exitoso. Bienvenido/a, " + data.usuario.nombre);
            window.location.href = "index.html";
        } else {
            alert("❌ Error: " + (data.error || data.message));
        }
    } catch (error) {
        console.error("Error en la solicitud:", error);
        alert("Hubo un problema al conectar con el servidor.");
    }
    });
});



