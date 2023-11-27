// script.js




// Obtén referencias a los elementos de entrada de filas y columnas
const rowsInput = document.getElementById("rows");
const columnsInput = document.getElementById("columns");
const startButton = document.getElementById("start-button");
const helpButton = document.getElementById("help-button")

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

// Agrega un evento clic al botón de comienzo de partida
helpButton.addEventListener("click", function() {
    // Redirige a la página de ayuda 
    window.location.href = `ayuda.html`;
});


// Eventos relacionados al cargue de archivos
document.getElementById('load-board-button').addEventListener('click', function() {
    var fileInput = document.getElementById('board-file');
    
    if (fileInput.files.length > 0) {
        var selectedFile = fileInput.files[0];
        
        var reader = new FileReader();
        reader.onload = function(e) {
            var fileContent = e.target.result;
            var boardData = parseBoardData(fileContent);
            
            // Redirige a la página del tablero y pasa los datos como parámetros de consulta
            window.location.href = `tablero.html?width=${boardData.width}&height=${boardData.height}&data=${encodeURIComponent(JSON.stringify(boardData.data))}`;
        };

        reader.readAsText(selectedFile);
    } else {
        alert('Por favor selecciona un archivo antes de cargar.');
    }
});


function parseBoardData(fileContent) {
    var lines = fileContent.split('\n');
    var dimensions = lines[0].split(' ').map(Number);
    var width = dimensions[0];
    var height = dimensions[1];

    var boardData = [];

    for (var i = 1; i < lines.length; i++) {
        var values = lines[i].split(' ').map(Number);
        var tuple = {
            i: values[0],
            j: values[1],
            n: values[2], // Suma Vertical - Columna
            m: values[3] // Suma Horizontal - Fila
        };
        boardData.push(tuple);
    }

    return {
        width: width,
        height: height,
        data: boardData
    };
}
