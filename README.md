# 🧠 NeuroAula – Plataforma de Neuroaprendizaje con Node.js + MySQL + Frontend

NeuroAula` es una aplicación web educativa que gestiona usuarios y explora estrategias de neuroaprendizaje digital. Este proyecto es una aplicación web sencilla que permite realizar un **CRUD (Crear, Leer, Actualizar y Eliminar)** de usuarios, utilizando **Node.js** en el backend, **MySQL** como base de datos y una interfaz web desarrollada con **HTML, CSS y JavaScript** puro.


---

## 🚀 Tecnologías utilizadas

- **Backend:** Node.js, Express.js, MySQL2  
- **Frontend:** HTML5, CSS3, JavaScript  
- **Base de datos:** MySQL  
- **Configuración:** dotenv para manejo de variables de entorno  
- **Control de versiones:** Git + GitHub  

---

## 📂 Estructura del proyecto

```
NeuroAula/
├── backend/
│   ├── db.js
│   ├── server.js
│   ├── middleware.js
│   ├── routes/
│   │   └── usuarios.js
│   ├── database.sql
│   ├── .env.example
│
├── frontend/
│   ├── index.html
│   ├── script.js
│   └── styles.css
│
├── package.json
└── README.md
```

---

## 🧾 Descripción general

La aplicación se conecta a una base de datos MySQL que contiene una tabla `usuarios` con los campos:

| Campo | Tipo | Descripción |
|-------|------|--------------|
| id | INT (PK, AI) | Identificador único del usuario |
| nombre | VARCHAR(100) | Nombre completo del usuario |
| correo | VARCHAR(255) | Correo electrónico del usuario |
| password | VARCHAR(255) | Seis digitos |
| telefono | VARCHAR(50) | Teléfono de contacto |
| id_rol | INT (FK) | Rol diferenciador de contenidos |


Desde la interfaz web, el usuario puede:
- **Agregar nuevos usuarios**
- **Visualizar la lista de usuarios registrados**
- **Editar la información existente**
- **Eliminar usuarios**

---

## ⚙️ Instalación y configuración

Sigue los pasos a continuación para clonar y ejecutar el proyecto en tu entorno local:

### 1️⃣ Clonar el repositorio

```bash
git clone https://github.com/FabianaM81/proyecto-neuro-aula.git
cd proyecto-neuro-aula
```

---

### 2️⃣ Configurar la base de datos MySQL

1. Abre tu terminal de MySQL o phpMyAdmin.  
2. Crea la base de datos y su estructura importando el archivo SQL incluido:

```bash
mysql -u root -p < backend/database.sql
```

Esto creará la base de datos `proyecto_db` con la tabla `usuarios`.

---

### 3️⃣ Configurar variables de entorno

1. Dentro de la carpeta `backend`, crea un archivo llamado `.env` basado en el archivo `.env.example`:

```bash
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=proyecto_db
```

---

### 4️⃣ Instalar dependencias del backend

En la raíz del proyecto, ejecuta:

```bash
npm install
```

Esto instalará las dependencias definidas en `package.json` (`express`, `mysql2`, `cors`, `dotenv`).

---

### 5️⃣ Iniciar el servidor backend

Ejecuta:

```bash
node backend/server.js
```

Verás en la consola:

```
Conectado a la base de datos: proyecto_db
Servidor corriendo en http://localhost:5000
```

---

### 6️⃣ Ejecutar el frontend

Abre el archivo `frontend/index.html` directamente en tu navegador.  
La interfaz te permitirá realizar operaciones CRUD conectadas al backend.

---

## 👩‍💻 Autora

FabianaM81  
Desarrolladora en formación, apasionada por la tecnología educativa y el aprendizaje digital.  
Repositorio: https://github.com/FabianaM81/proyecto-neuro-aula

---

## ⚠️ Nota técnica

Durante el proceso de desarrollo, el repositorio presentó un inconveniente al realizar un push forzado desde una rama secundaria.  
El error ocasionó la pérdida del historial de commits previos y la necesidad de reinicializar el repositorio para mantener la estabilidad del proyecto.  

Es importante mencionar que el trabajo en este proyecto se ha venido realizando de forma continua durante las últimas dos semanas, con actualizaciones diarias y pruebas locales en el entorno de desarrollo.  
La versión actual refleja el mismo avance y estructura funcional lograda durante ese proceso.

La versión de este documento simula el README de crud-usuarios.

Se siguen trabajando en mejoras después de haberse compartido el enlace 27/10/2025

---