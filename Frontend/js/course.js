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
        titulo: "Discalculia: reforzando el razonamiento lógico",
        descripcion: "Material didáctico para el desarrollo del pensamiento numérico, la comprensión de magnitudes y la resolución de problemas básicos.",
        actividades: [
            "Juego interactivo de sumas y restas (Cerebriti)",
            "Ejercicio de secuencias numéricas (Educaplay)",
            "Actividad: problemas cotidianos con apoyo visual"
    ],
    recursos: [
        { nombre: "Orientación Andújar - Discalculia (fichas y ejercicios)", url: "https://www.orientacionandujar.es/category/discalculia/" },
        { nombre: "Video: ¿Qué es la discalculia? (Fundación CADAH)", url: "https://www.youtube.com/watch?v=DKdc8JjSvVQ" },
        { nombre: "Actividades de lógica y razonamiento (Khan Academy)", url: "https://es.khanacademy.org/math" },
        { nombre: "Juegos matemáticos interactivos (Cerebriti)", url: "https://www.cerebriti.com/juegos-de-matematicas" }
    ]
},
      disortografia: {
        titulo: "Disortografía: fortaleciendo la escritura",
        descripcion: "Actividades y materiales enfocados en la mejora de la ortografía, gramática y composición escrita.",
        actividades: [
            "Dictado auditivo interactivo (Educaplay)",
            "Juego de ortografía visual (Cerebriti)",
            "Taller de corrección de textos comunes"
    ],
    recursos: [
        { nombre: "Orientación Andújar - Disortografía (recursos descargables)", url: "https://www.orientacionandujar.es/category/disortografia/" },
        { nombre: "Video educativo: Reglas ortográficas básicas", url: "https://www.youtube.com/watch?v=ANOPH5zvF3U" },
        { nombre: "Ejercicios de ortografía interactivos (Educaplay)", url: "https://es.educaplay.com" },
        { nombre: "Juegos de palabras y escritura (Cerebriti)", url: "https://www.cerebriti.com/juegos-de-lengua" }
    ]
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
