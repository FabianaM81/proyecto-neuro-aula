// === Archivo: course.js ===
// Controlador dinámico para la página de detalle de cursos (Dislexia, Discalculia, Disortografía)

document.addEventListener("DOMContentLoaded", () => {
    console.log("Archivo course.js cargado correctamente");

    const courseTitle = document.getElementById("course-title");
    const courseDescription = document.getElementById("course-description");
    const activitiesList = document.getElementById("course-activities-list");
    const resourcesList = document.getElementById("course-resources-list");

    // Aquí se cargará el contenido dinámico de cada curso
    // Simulación de datos base (por si los enlaces del informe no están activos)
    const cursos = {
        dislexia: {
            titulo: "Curso sobre Dislexia",
            descripcion: "Recursos y actividades para mejorar la lectura y comprensión.",
            actividades: ["Juego de palabras", "Ejercicio de comprensión lectora"],
            recursos: [
                { nombre: "Guía para docentes", url: "https://khanacademy.org" },
                { nombre: "Video explicativo", url: "https://youtube.com" }
            ]
        },
        discalculia: {
            titulo: "Curso sobre Discalculia",
            descripcion: "Material para reforzar el razonamiento lógico y numérico.",
            actividades: ["Sumas interactivas", "Juego de fracciones"],
            recursos: [
                { nombre: "Artículo educativo", url: "https://edutopia.org" },
                { nombre: "Juego de matemáticas", url: "https://cerebriti.com" }
            ]
        },
        disortografia: {
            titulo: "Curso sobre Disortografía",
            descripcion: "Actividades y materiales para mejorar la escritura y ortografía.",
            actividades: ["Dictado interactivo", "Corrección de texto"],
            recursos: [
                { nombre: "Guía práctica", url: "https://educaplay.com" },
                { nombre: "Video explicativo", url: "https://youtube.com" }
            ]
        }
    };

    // Obtener el curso desde la URL (por ejemplo: ?id=dislexia)
    const urlParams = new URLSearchParams(window.location.search);
    const cursoId = urlParams.get("id") || "dislexia";
    const curso = cursos[cursoId];

    if (curso) {
        courseTitle.textContent = curso.titulo;
        courseDescription.textContent = curso.descripcion;

        curso.actividades.forEach(act => {
            const li = document.createElement("li");
            li.textContent = act;
            activitiesList.appendChild(li);
        });

        curso.recursos.forEach(r => {
            const li = document.createElement("li");
            const a = document.createElement("a");
            a.href = r.url;
            a.textContent = r.nombre;
            a.target = "_blank";
            li.appendChild(a);
            resourcesList.appendChild(li);
        });
    }
});
