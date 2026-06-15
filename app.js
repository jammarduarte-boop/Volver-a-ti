// Memoria local de la App
let appData = { reflexiones: [], afirmaciones: [] };

// Respuestas Inteligentes a Emociones
const respuestasEmociones = {
    Triste: "Está bien no sentirse bien. Llorar limpia el alma. Date permiso de procesar este momento sin juzgarte.",
    Ansiosa: "Respira profundamente. No tienes que resolver todo hoy.<br><br><b>Ejercicio de respiración:</b><br>1. Inhala por 4 segundos.<br>2. Mantén el aire por 4 segundos.<br>3. Exhala lentamente por 6 segundos.",
    Agotada: "Tu cuerpo y tu mente te están pidiendo un alto. Hoy está permitido no ser productiva. Descansa.",
    Herida: "El dolor de hoy es el inicio de tu fortaleza de mañana. Protege tu espacio y sé amable con tu proceso.",
    Perdida: "No estás perdida, te estás redescubriendo. Cuando no sepas a dónde ir, simplemente vuelve a ti.",
    Esperanzada: "¡Qué hermoso sentimiento! Abraza esta luz, regístrala y recuerda esta sensación para los días grises."
};

// Al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    cargarContenido();
    obtenerReflexion();
    obtenerAfirmacion();
});

// Cargar Base de datos JSON
async function cargarContenido() {
    try {
        const response = await fetch('data/contenido.json');
        appData = await response.json();
        obtenerReflexion();
        obtenerAfirmacion();
    } catch (error) {
        console.log("Cargando datos por defecto locales...");
        // Respaldo en caso de bloqueo local de fetch
        appData = {
            reflexiones: ["La paz comienza cuando dejas de luchar contra ti misma.", "A veces sanar significa descansar."],
            afirmaciones: ["Soy suficiente.", "Merezco paz."]
        };
    }
}

// Sistema de Navegación Simple
function switchScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => screen.classList.remove('active'));
    document.querySelectorAll('#main-nav button').forEach(btn => btn.classList.remove('active'));
    
    document.getElementById(`screen-${screenId}`).classList.add('active');
    
    // Resaltar botón activo en el menú
    const currentBtn = Array.from(document.querySelectorAll('#main-nav button')).find(btn => btn.getAttribute('onclick').includes(screenId));
    if(currentBtn) currentBtn.classList.add('active');
}

// Lógica de Pantalla: Emociones
function selectEmotion(emocion) {
    const contenedor = document.getElementById('resultado-emocion');
    contenedor.style.display = "block";
    contenedor.innerHTML = `<h3>Te sientes: ${emocion}</h3><p style="margin-top:10px;">${respuestasEmociones[emocion]}</p>`;
}

// Lógica de Pantalla: Reflexiones Aleatorias
function obtenerReflexion() {
    if(appData.reflexiones.length > 0) {
        const random = appData.reflexiones[Math.floor(Math.random() * appData.reflexiones.length)];
        document.getElementById('texto-reflexion').innerText = `"${random}"`;
    }
}

// Lógica de Pantalla: Afirmaciones Aleatorias
function obtenerAfirmacion() {
    if(appData.afirmaciones.length > 0) {
        const random = appData.afirmaciones[Math.floor(Math.random() * appData.afirmaciones.length)];
        document.getElementById('texto-afirmacion').innerText = random;
    }
}

// Lógica de Pantalla: Guardar Diario en LocalStorage
function guardarDiario() {
    const entrada = {
        fecha: new Date().toLocaleDateString(),
        q1: document.getElementById('q1').value,
        q2: document.getElementById('q2').value,
        q3: document.getElementById('q3').value,
        q4: document.getElementById('q4').value
    };

    localStorage.setItem('diario_volver_a_ti', JSON.stringify(entrada));
    alert('✨ Tu entrada de diario ha sido guardada en tu Refugio Seguro.');
    
    // Limpiar campos
    document.querySelectorAll('textarea').forEach(tx => tx.value = "");
}

// Lógica de Pantalla: SOS
function activarSOS() {
    const contenedor = document.getElementById('resultado-sos');
    contenedor.style.display = "block";
    contenedor.innerHTML = `
        <h3 style="color: #ff4d4d;">Abrazo Virtual Detente 🤍</h3>
        <p><b>Detente un momento. Respira.</b></p>
        <p>No necesitas resolver toda tu vida hoy. Solo necesitas dar el siguiente paso. Estás a salvo aquí.</p>
    `;
}
