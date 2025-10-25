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
        descripcion: "Recursos prácticos guías, videos y actividades para docentes y familias para apoyar la lectura y la fluidez lectora.",
    imagen: {
    docente: "../assets/cursos_media/dislexia_docente.jpg",
    estudiante: "../assets/cursos_media/dislexia_estudiante.jpg"
},
      actividades: [
    {
        titulo: "Juego de reconocimiento de letras (Educaplay)",
        descripcion: "Actividad interactiva para fortalecer la identificación visual y auditiva de letras. Permite a los docentes observar qué fonemas generan más confusión y reforzarlos mediante dinámicas lúdicas."
    },
    {
        titulo: "Ejercicio de lectura guiada con apoyo visual",
        descripcion: "Actividad diseñada para acompañar la lectura con imágenes, colores o resaltados que faciliten la comprensión del texto. Recomendable para alumnos con dislexia."
    },
    {
        titulo: "Actividad: asociación palabra-imagen (Cerebriti)",
        descripcion: "Ejercicio digital que relaciona palabras con sus imágenes correspondientes, reforzando vocabulario y ortografía. Útil en casos de disortografía o discalculia verbal."
    }
],

 recursos: {
    docente: [
        { nombre: "Guía del Ministerio de Educación sobre Lectura Inclusiva (PDF)", url: "https://www.mineducacion.gov.co/1759/articles-360293_foto_portada.pdf" },
        { nombre: "Video: Entendiendo la Dislexia de forma sencilla", url: "https://www.youtube.com/watch?v=bNjr9Y1k0SI" },
        { nombre: "Juegos Online para Estimular la Lectoescritura", url: "https://www.educaenvivo.com/juegos-educativos-online/dislexia/" },
        { nombre: "Video: Estrategias Pedagógicas Efectivas", url: "https://www.youtube.com/watch?v=TjcRGoEAIPg" },
        { nombre: "Disfam Colombia: Recursos y Apoyo Familiar", url: "https://disfam.org/colombia/" }
    ],
    estudiante: [
        { nombre: "Video: Entendiendo la Dislexia de forma sencilla", url: "https://www.youtube.com/watch?v=bNjr9Y1k0SI" },
        { nombre: "Juegos Online para Estimular la Lectoescritura", url: "https://www.educaenvivo.com/juegos-educativos-online/dislexia/" }
    ]
},
tarjetas: [
  {
    tipo: "juego",
    nombre: "Juego de reconocimiento de letras (Educaplay)",
    url: "https://es.educaplay.com/"
  },
  {
    tipo: "enlace",
    nombre: "Orientación Andújar – Recursos para Dislexia",
    url: "https://www.orientacionandujar.es/category/competencia-linguistica/dislexia-2/"
  },
  {
    tipo: "video",
    nombre: "Video explicativo: Comprender la Dislexia",
    url: "https://www.youtube.com/watch?v=frKqZ3-sQUE"
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
],

tarjetas: [
  {
    tipo: "video",
    nombre: "Video explicativo: Diagnóstico e Intervención",
    url: "https://www.youtube.com/watch?v=p7nER_3lJbo"
  },
  {
    tipo: "juego",
    nombre: "Juego interactivo de sumas y restas (Cerebriti)",
    url: "https://www.cerebriti.com/juegos-de-matematicas"
  },
  {
    tipo: "enlace",
    nombre: "Técnicas y Recursos para la enseñanza (PDF)",
    url: "https://universidadeuropea.com/blog/dislexia-discalculia/"
  }
]
},
      disortografia: {
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

],
tarjetas: [
  {
    tipo: "video",
    nombre: "Video explicativo: ¿Qué es la Disortografía?",
    url: "https://www.youtube.com/watch?v=ipxkT9GrLHE"
  },
  {
    tipo: "juego",
    nombre: "Dictado auditivo interactivo (Educaplay)",
    url: "https://es.educaplay.com/"
  },
  {
    tipo: "enlace",
    nombre: "Orientación Andújar - Recursos descargables",
    url: "https://www.orientacionandujar.es/category/disortografia/"
  }
]
}
    };

    // Obtener el curso desde la URL (por ejemplo: ?id=dislexia)
    const urlParams = new URLSearchParams(window.location.search);
    const cursoId = urlParams.get("id") || "dislexia";
    const curso = cursos[cursoId];
    // === DEBUG TEMPORAL ===
    console.log("Curso cargado:", curso);
    console.log("Recursos:", curso.recursos);
    console.log("Actividades:", curso.actividades);

if (curso) {
    courseTitle.textContent = curso.titulo;
    courseDescription.textContent = curso.descripcion;
    // document.getElementById("course-breadcrumb").textContent = curso.titulo;

    // === Mostrar imagen del curso según el rol ===
    if (courseImage && curso.imagen) {
        // Rol actual (ajústalo según tu sistema de login o variable global)
        const userRole = localStorage.getItem("userRole") || "estudiante"; 
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
        visualContainer.innerHTML = ""; 
    
        curso.tarjetas.forEach((t, index) => {
        const card = document.createElement("div");
        card.classList.add("resource-card");
        
        if (index === 2) {
            card.classList.add("full-width-card");
        }

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
    const userRoleVideo = localStorage.getItem("userRole") || "estudiante";

// Obtener recursos según el rol para el video
let recursosParaVideo = curso.recursos;
if (curso.recursos && typeof curso.recursos === 'object' && !Array.isArray(curso.recursos)) {
    recursosParaVideo = curso.recursos[userRoleVideo] || curso.recursos.estudiante || [];
}

// Buscar el primer video de YouTube
if (Array.isArray(recursosParaVideo)) {
    const videoResource = recursosParaVideo.find(r => r.url && r.url.includes("youtube"));
    if (videoFrame && videoResource) {
        videoFrame.src = videoResource.url.replace("watch?v=", "embed/");
    }
}

    const infoContent = document.getElementById("info-content-area");
    if (infoContent) {
    const userRole = localStorage.getItem("userRole") || "estudiante";
    
    let textoExpandido = "";
    
    if (cursoId === "dislexia" && userRole === "docente") {
        textoExpandido = "La dislexia es una dificultad específica del aprendizaje que afecta la lectura y la escritura, sin relación con la inteligencia del estudiante. Los alumnos con dislexia suelen confundir letras, invertir sílabas o leer con lentitud. En el aula, se recomienda brindar más tiempo en actividades de lectura, usar recursos visuales y promover la comprensión antes que la velocidad. La clave está en crear un ambiente paciente, reconocer el esfuerzo y ofrecer apoyos personalizados que fortalezcan la confianza y las habilidades lectoras.";
    } else if (cursoId === "dislexia" && userRole === "estudiante") {
        textoExpandido = "La dislexia significa que tu cerebro aprende de una forma diferente, por eso leer o escribir puede ser más difícil, pero no imposible. Con práctica, apoyo y estrategias adecuadas, puedes mejorar y disfrutar del aprendizaje. No te compares con otros, pide ayuda cuando la necesites y recuerda que tener dislexia no te limita, solo te hace aprender de otra manera.";
    } else {
        textoExpandido = "Este módulo ofrece estrategias y recursos seleccionados para comprender mejor las características del trastorno y su abordaje pedagógico.";
    }
    
    infoContent.innerHTML = `
        <h3>Contenido informativo</h3>
        <p>${textoExpandido}</p>
    `;
}
        // === Renderizar actividades con descripciones ===
if (curso.actividades) {
    curso.actividades.forEach(act => {
        const li = document.createElement("li");
        
        // Si la actividad es un objeto con título y descripción
        if (typeof act === 'object' && act.titulo) {
            li.innerHTML = `<strong>${act.titulo}</strong><br><span style="font-size: 0.9em; color: #666;">${act.descripcion}</span>`;
        } else {
            
            li.textContent = act;
        }
        
        activitiesList.appendChild(li);
    });
}

// === Renderizar recursos según rol ===
const userRole = localStorage.getItem("userRole") || "estudiante";
let recursosActuales = curso.recursos;

// Si recursos está separado por rol, obtener el array correspondiente
if (curso.recursos && typeof curso.recursos === 'object' && !Array.isArray(curso.recursos)) {
    recursosActuales = curso.recursos[userRole] || curso.recursos.estudiante || [];
}

if (recursosActuales && Array.isArray(recursosActuales)) {
    recursosActuales.forEach(r => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = r.url;
        a.textContent = r.nombre;
        a.target = "_blank";
        li.appendChild(a);
        resourcesList.appendChild(li);
    });
}
    } 
});
