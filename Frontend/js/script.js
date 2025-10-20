// script.js (maneja el registro)
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".registration-form");
  if (!form) return; // evita errores si no estamos en la página de registro

  form.addEventListener("submit", async (e) => {
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
        form.reset();
        window.location.href = "../html/login.html";
        } else {
        alert("❌ Error: " + (data.error || data.message));
        }
    } catch (error) {
        console.error("Error en la solicitud:", error);
        alert("Hubo un problema al conectar con el servidor.");
    }
  });
});

