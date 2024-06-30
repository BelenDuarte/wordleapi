let palabra = '';
let intentos = 6;

const grid = document.getElementById("grid");
const boton = document.getElementById("guess-button");

// Función para obtener una palabra aleatoria de la API
async function obtenerPalabraAleatoria() {
    try {
        const response = await fetch('https://random-word-api.herokuapp.com/word?number=1&length=5');
        const data = await response.json();
        palabra = data[0].toUpperCase();
    } catch (error) {
        console.error('Error al obtener la palabra aleatoria:', error);
        palabra = 'ERROR';
    }
}


obtenerPalabraAleatoria();

boton.addEventListener("click", () => {
    const intento = leerIntento();
    console.clear();

    const row = document.createElement("div");
    row.className = "row";

    for (const i in palabra) {
        const span = document.createElement("span");
        span.className = "letter";
        span.innerHTML = intento[i];
        if (palabra[i] === intento[i]) { 
            span.style.backgroundColor = "green";
        } else if (palabra.includes(intento[i])) {
            span.style.backgroundColor = "yellow";
        } else {
            span.style.backgroundColor = "gray";
        }
        row.appendChild(span);
    }
    grid.appendChild(row);

    if (palabra === intento) {
        terminar("¡GANASTE! 😀");
        return;
    }

    intentos--;

    if (!intentos) {
        terminar(`¡PERDISTE! 😖 La palabra correcta era: ${palabra}`);
        return;
    }
});

function terminar(mensaje) {
    const resultado = document.getElementById("guesses");
    resultado.innerHTML = `<h1>${mensaje}</h1>`;
    boton.disabled = true;
}

function leerIntento() {
    const input = document.getElementById("guess-input");
    return input.value.toUpperCase();
}
