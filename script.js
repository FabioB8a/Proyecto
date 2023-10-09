// script.js

// Obtén referencias a los elementos de entrada de filas y columnas
const rowsInput = document.getElementById("rows");
const columnsInput = document.getElementById("columns");
const startButton = document.getElementById("start-button");

// Agrega un evento clic al botón de comienzo de partida
startButton.addEventListener("click", function() {
    // Obtén los valores de filas y columnas ingresados por el usuario
    const numRows = parseInt(rowsInput.value);
    const numColumns = parseInt(columnsInput.value);

    // Verifica si los valores son válidos (por ejemplo, mayores o iguales a 4)
    if (numRows >= 4 && numColumns >= 4) {
        // Redirige a otra página y pasa los valores como parámetros de consulta (query parameters)
        window.location.href = `tablero.html?rows=${numRows}&columns=${numColumns}`;
    } else {
        alert("Por favor, ingresa valores válidos para filas y columnas (mínimo 4).");
    }
});
