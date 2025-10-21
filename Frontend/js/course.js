// === Archivo: course.js ===
// Controlador dinámico para la página de detalle de cursos (Dislexia, Discalculia, Disortografía)

document.addEventListener("DOMContentLoaded", () => {
    console.log("Archivo course.js cargado correctamente");

    const courseTitle = document.getElementById("course-title");
    const courseDescription = document.getElementById("course-description");
    const activitiesList = document.getElementById("course-activities-list");
    const resourcesList = document.getElementById("course-resources-list");

    // Simulación de datos base (ya con enlaces comprobados)
    const cursos = {
      dislexia: {
        titulo: "Dislexia: comprensión y apoyo",
        descripcion: "Recursos prácticos (guías, videos y actividades) para docentes y familias para apoyar la lectura y la fluidez lectora.",
        actividades: [
            "Juego de reconocimiento de letras (Educaplay)",
            "Ejercicio de lectura guiada con apoyo visual",
            "Actividad: asociación palabra-imagen (Cerebriti)"
    ],
    recursos: [
        { nombre: "Orientación Andújar - Dislexia (recursos y fichas)", url: "https://www.orientacionandujar.es/category/competencia-linguistica/dislexia-2/" },
        { nombre: "Guía para padres y educadores (Child Mind Institute, ES)", url: "https://childmind.org/es/guia/guia-para-padres-sobre-la-dislexia/" },
        { nombre: "Video explicativo: Introducción a la dislexia", url: "https://www.youtube.com/watch?v=frKqZ3-sQUE" },
        { nombre: "Actividades interactivas (Educaplay)", url: "https://es.educaplay.com" }
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
