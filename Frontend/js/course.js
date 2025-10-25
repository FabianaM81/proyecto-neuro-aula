// === Archivo: course.js ===
// Controlador dinámico para la página de detalle de cursos (Dislexia, Discalculia, Disortografía)

document.addEventListener("DOMContentLoaded", () => {
    console.log("Archivo course.js cargado correctamente");

    const courseTitle = document.getElementById("course-title");
    const courseDescription = document.getElementById("course-description");
    // === Mostrar imagen del curso ===
    const courseImage = document.getElementById("course-image");
    const activitiesList = document.getElementById("course-activities-list");
    const resourcesList = document.getElementById("course-resources-list");

    // Simulación de datos base (ya con enlaces comprobados)
    const cursos = {
      dislexia: {
        titulo: "Dislexia: comprensión y apoyo",
        descripcion: "Recursos prácticos (guías, videos y actividades) para docentes y familias para apoyar la lectura y la fluidez lectora.",
    imagen: {
    docente: "../assets/cursos_media/dislexia_docente.jpg",
    estudiante: "../assets/cursos_media/dislexia_estudiante.jpg"
},
        actividades: [
            "Juego de reconocimiento de letras (Educaplay)",
            "Ejercicio de lectura guiada con apoyo visual",
            "Actividad: asociación palabra-imagen (Cerebriti)"
    ],
  recursos: [
    { nombre: "Guía del Ministerio de Educación sobre Lectura Inclusiva (PDF)", url: "https://www.mineducacion.gov.co/1759/articles-360293_foto_portada.pdf" },
    { nombre: "Video: Entendiendo la Dislexia de forma sencilla", url: "https://www.youtube.com/watch?v=Pmbp80t4flY" },
    { nombre: "Juegos Online para Estimular la Lectoescritura", url: "https://www.educaenvivo.com/juegos-educativos-online/dislexia/" },
    { nombre: "Video: Estrategias Pedagógicas Efectivas (Docentes)", url: "https://www.youtube.com/watch?v=pOeJ7si8uJs" },
    { nombre: "Disfam Colombia: Recursos y Apoyo Familiar", url: "https://disfam.org/colombia/" }
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
    docente: "../assets/cursos_media/discalculia_docente.jpg",
    estudiante: "../assets/cursos_media/discalculia_estudiante.jpg"
},
        actividades: [
            "Juego interactivo de sumas y restas (Cerebriti)",
            "Ejercicio de secuencias numéricas (Educaplay)",
            "Actividad: problemas cotidianos con apoyo visual"
    ],
  recursos: [
    { nombre: "Discalculia: La dificultad para aprender matemáticas", url: "https://www.infobae.com/educacion/2024/03/13/discalculia-la-dificultad-para-que-los-ninos-ninas-y-jovenes-aprendan-matematicas-como-abordarla-en-el-aula/" },
    { nombre: "Dislexia y Discalculia: Diferencias y similitudes", url: "https://universidadeuropea.com/blog/dislexia-discalculia/" },
    { nombre: "Video: Estrategias para abordar la Discalculia (Docentes)", url: "https://www.youtube.com/watch?v=p7nER_3lJbo" },
    { nombre: "Libros sobre la Discalculia", url: "https://sololibros.org/libros-sobre-la-discalculia/" }
]
},
      "disortografía": {
        titulo: "Disortografía: fortaleciendo la escritura",
        descripcion: "Actividades y materiales enfocados en la mejora de la ortografía, gramática y composición escrita.",
    imagen: {
    docente: "../assets/cursos_media/disortografia_docente.jpg",
    estudiante: "../assets/cursos_media/disortografia_estudiante.jpg"
},
        actividades: [
            "Dictado auditivo interactivo (Educaplay)",
            "Juego de ortografía visual (Cerebriti)",
            "Taller de corrección de textos comunes"
    ],
    recursos: [
    { nombre: "Video: ¿Qué es la Disortografía?", url: "https://www.youtube.com/watch?v=ipxkT9GrLHE" },
    { nombre: "Video: Estrategias para mejorar la ortografía", url: "https://www.youtube.com/watch?v=teKVYaUgHHs" },
    { nombre: "Video: Abordaje pedagógico de la Disortografía (Docentes)", url: "https://www.youtube.com/watch?v=vBJDibdziqk" },
    { nombre: "Orientación Andújar - Disortografía (recursos descargables)", url: "https://www.orientacionandujar.es/category/disortografia/" }
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
    // document.getElementById("course-breadcrumb").textContent = curso.titulo;

    // === Mostrar imagen del curso según el rol ===
    if (courseImage && curso.imagen) {
        // Rol actual (ajústalo según tu sistema de login o variable global)
        const userRole = localStorage.getItem("userRole") || "docente"; 
        // También puede ser: "estudiante"

        // Asigna la imagen según el rol
        if (userRole === "docente" && curso.imagen.docente) {
            courseImage.src = curso.imagen.docente;
        } else if (userRole === "estudiante" && curso.imagen.estudiante) {
            courseImage.src = curso.imagen.estudiante;
        } else {
            // Si no hay imagen específica, usa una genérica
            courseImage.src = "../assets/cursos_media/curso_general.jpg";
        }
    }

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
