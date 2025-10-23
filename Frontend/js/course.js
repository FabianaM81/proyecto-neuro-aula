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
        imagen: {
        docente: "../assets/img/Dislexiaprof.jpg",
        estudiante: "../assets/img/DislexiaEst.jpg"
},
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
    ],
    tarjetas: [
  {
    tipo: "video",
    nombre: "Video explicativo: Comprender la Dislexia",
    url: "https://www.youtube.com/watch?v=frKqZ3-sQUE"
  },
  {
    tipo: "juego",
    nombre: "Juego de reconocimiento de letras (Educaplay)",
    url: "https://es.educaplay.com/"
  },
  {
    tipo: "enlace",
    nombre: "Orientación Andújar – Recursos para Dislexia",
    url: "https://www.orientacionandujar.es/category/competencia-linguistica/dislexia-2/"
  }
]
},
       discalculia: {
        titulo: "Discalculia: reforzando el razonamiento lógico",
        descripcion: "Material didáctico para el desarrollo del pensamiento numérico, la comprensión de magnitudes y la resolución de problemas básicos.",
        imagen: {
        docente: "../assets/img/Discalculiaprof.jpg",
        estudiante: "../assets/img/DiscalculiaEst.jpg"
},
        actividades: [
            "Juego interactivo de sumas y restas (Cerebriti)",
            "Ejercicio de secuencias numéricas (Educaplay)",
            "Actividad: problemas cotidianos con apoyo visual"
    ],
    recursos: [
        { nombre: "Orientación Andújar - Discalculia (fichas y ejercicios)", url: "https://www.orientacionandujar.es/category/discalculia/" },
        { nombre: "Video educativo: ¿Qué es la DISCALCULIA? Todo lo que necesitas saber", url: "https://www.youtube.com/watch?v=fs19szj8L78&t=17s" },
        { nombre: "Actividades de lógica y razonamiento (Khan Academy)", url: "https://es.khanacademy.org/math" },
        { nombre: "Juegos matemáticos interactivos (Cerebriti)", url: "https://www.cerebriti.com/juegos-de-matematicas" }
    ]
},
      disortografia: {
        titulo: "Disortografía: fortaleciendo la escritura",
        descripcion: "Actividades y materiales enfocados en la mejora de la ortografía, gramática y composición escrita.",
        imagen: {
        docente: "../assets/img/Disortografiaprof.jpg",
        estudiante: "../assets/img/DisortografiaEst.jpg"
},
        actividades: [
            "Dictado auditivo interactivo (Educaplay)",
            "Juego de ortografía visual (Cerebriti)",
            "Taller de corrección de textos comunes"
    ],
    recursos: [
        { nombre: "Orientación Andújar - Disortografía (recursos descargables)", url: "https://www.orientacionandujar.es/category/disortografia/" },
        { nombre: "Video educativo: Reglas ortográficas básicas (Lengua en Acción)", url: "https://www.youtube.com/watch?v=QtD5qLn6gEY" },
        { nombre: "Ejercicios de ortografía interactivos (Educaplay)", url: "https://es.educaplay.com" },
        { nombre: "Juegos de palabras y escritura (Cerebriti)", url: "https://www.cerebriti.com/juegos-de-lengua" }
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

        // === Generar tarjetas visuales ===
        const visualContainer = document.getElementById("visual-resources-container");
        if (visualContainer && curso.tarjetas) {
        visualContainer.innerHTML = ""; // Limpia antes de agregar
        curso.tarjetas.forEach(t => {
        const card = document.createElement("div");
        card.classList.add("resource-card");

        let content = "";
        if (t.tipo === "video") {
            content = `<iframe src="${t.url.replace("watch?v=", "embed/")}" frameborder="0" allowfullscreen></iframe>`;
        } else if (t.tipo === "imagen") {
            content = `<img src="${t.url}" alt="${t.nombre}" />`;
        } else if (t.tipo === "juego" || t.tipo === "enlace") {
            content = `<a href="${t.url}" target="_blank">${t.nombre}</a>`;
        }

        card.innerHTML = `
            <h4>${t.nombre}</h4>
            ${content}
        `;
        visualContainer.appendChild(card);
    });
}

        const videoFrame = document.getElementById("course-video");
        const videoResource = curso.recursos.find(r => r.url.includes("youtube"));
        if (videoFrame && videoResource) videoFrame.src = videoResource.url.replace("watch?v=", "embed/");

        const infoContent = document.getElementById("info-content-area");
        if (infoContent) {
        infoContent.innerHTML = `
            <h3>Contenido informativo</h3>
            <p>${curso.descripcion}</p>
            <p>Este módulo ofrece estrategias y recursos seleccionados para comprender mejor las características del trastorno y su abordaje pedagógico.</p>
        `;
    }

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
