// ========================================
// VERIFICAR AUTENTICACIÓN Y ROL
// ========================================
document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  const idRol = localStorage.getItem("id_rol");
  const nombreUsuario = localStorage.getItem("nombreUsuario");

  // Verificar que esté autenticado
  if (!token) {
    alert("⚠️ Debes iniciar sesión para acceder a esta página.");
    window.location.href = "login.html";
    return;
  }

  // Verificar que sea Administrador (id_rol = 3)
  if (idRol !== "3") {
    alert("❌ No tienes permisos para acceder a esta página.");
    window.location.href = "resources.html";
    return;
  }

  // Mostrar nombre del usuario actual
  document.getElementById("current-user").textContent = nombreUsuario || "Usuario";

  // Cargar usuarios
  fetchUsers();
});

// ========================================
// OBTENER USUARIOS DEL BACKEND
// ========================================
async function fetchUsers() {
  const token = localStorage.getItem("token");
  const container = document.getElementById("user-list-container");

  try {
    const response = await fetch("http://localhost:5000/api/usuarios", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error("Error al obtener usuarios");
    }

    const usuarios = await response.json();

    if (usuarios.length === 0) {
      container.innerHTML = '<div class="no-users">📭 No hay usuarios registrados</div>';
      return;
    }

    renderUsers(usuarios);

  } catch (error) {
    console.error("Error:", error);
    container.innerHTML = `
      <div class="error">
        ❌ Error al cargar los usuarios: ${error.message}
      </div>
    `;
  }
}

// ========================================
// RENDERIZAR TABLA DE USUARIOS
// ========================================
function renderUsers(usuarios) {
  const container = document.getElementById("user-list-container");

  let tableHTML = `
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Correo</th>
          <th>Rol</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
  `;

  usuarios.forEach(usuario => {
    const rolBadge = getRolBadge(usuario.id_rol);
    
    tableHTML += `
      <tr>
        <td>${usuario.id}</td>
        <td>${usuario.nombre}</td>
        <td>${usuario.correo}</td>
        <td>${rolBadge}</td>
        <td>
          <button class="btn btn-edit" onclick="editUser(${usuario.id}, '${usuario.nombre}', '${usuario.correo}', ${usuario.id_rol})">✏️ Editar</button>
          <button class="btn btn-delete" onclick="deleteUser(${usuario.id}, '${usuario.nombre}')">🗑️ Eliminar</button>
        </td>
      </tr>
    `;
  });

  tableHTML += `
      </tbody>
    </table>
  `;

  container.innerHTML = tableHTML;
}

// ========================================
// OBTENER BADGE SEGÚN ROL
// ========================================
function getRolBadge(idRol) {
  switch (parseInt(idRol)) {
    case 1:
      return '<span class="badge badge-profesor">👨‍🏫 Profesor</span>';
    case 2:
      return '<span class="badge badge-estudiante">🎓 Estudiante</span>';
    case 3:
      return '<span class="badge badge-admin">👑 Administrador</span>';
    default:
      return '<span class="badge badge-estudiante">❓ Desconocido</span>';
  }
}

// ========================================
// EDITAR USUARIO
// ========================================
function editUser(id, nombre, correo, idRol) {
  const nuevoNombre = prompt("Editar Nombre:", nombre);
  if (nuevoNombre === null) return;

  const nuevoCorreo = prompt("Editar Correo:", correo);
  if (nuevoCorreo === null) return;

  const nuevoRol = prompt("Editar Rol (1=Profesor, 2=Estudiante, 3=Administrador):", idRol);
  if (nuevoRol === null) return;

  const nuevaPassword = prompt("Nueva Contraseña (dejar vacío para no cambiar):");

  updateUser(id, nuevoNombre, nuevoCorreo, nuevoRol, nuevaPassword);
}

// ========================================
// ACTUALIZAR USUARIO EN BACKEND
// ========================================
async function updateUser(id, nombre, email, id_rol, password) {
  const token = localStorage.getItem("token");

  const body = {
    nombre: nombre.trim(),
    email: email.trim(),
    id_rol: parseInt(id_rol)  //
  };

  // Solo enviar password si se proporcionó
  if (password && password.trim() !== "") {
    body.password = password.trim();
  }

  try {
    const response = await fetch(`http://localhost:5000/api/usuarios/${id}`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();

    if (response.ok) {
      alert("✅ Usuario actualizado exitosamente");
      fetchUsers(); // Recargar la tabla
    } else {
      alert("❌ Error: " + (data.error || data.message));
    }
  } catch (error) {
    console.error("Error:", error);
    alert("❌ Error al actualizar usuario");
  }
}

// ========================================
// ELIMINAR USUARIO
// ========================================
function deleteUser(id, nombre) {
  const confirmar = confirm(`⚠️ ¿Estás seguro de eliminar al usuario "${nombre}"?\n\nEsta acción no se puede deshacer.`);
  
  if (!confirmar) return;

  performDelete(id);
}

// ========================================
// EJECUTAR ELIMINACIÓN EN BACKEND
// ========================================
async function performDelete(id) {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(`http://localhost:5000/api/usuarios/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });

    const data = await response.json();

    if (response.ok) {
      alert("✅ Usuario eliminado exitosamente");
      fetchUsers(); // Recargar la tabla
    } else {
      alert("❌ Error: " + (data.error || data.message));
    }
  } catch (error) {
    console.error("Error:", error);
    alert("❌ Error al eliminar usuario");
  }
}

// ========================================
// CERRAR SESIÓN
// ========================================
function logout() {
  if (confirm("¿Estás seguro de que deseas cerrar sesión?")) {
    localStorage.clear();
    alert("✅ Sesión cerrada correctamente");
    window.location.href = "login.html";
  }
}