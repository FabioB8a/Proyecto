// Obtener filas y columnas

function getQueryParams() {
    const queryParams = new URLSearchParams(window.location.search);
    const rows = parseInt(queryParams.get("rows"));
    const columns = parseInt(queryParams.get("columns"));
    console.log(rows);
    console.log(columns);
    return { rows, columns };
}


// Funciones para generar el Kakuro

function crearCeldaInput() {
    const input = document.createElement("input");
    input.type = "number";
    input.min = 1;
    input.max = 9;
    input.className = "kakuro-cell";
    return input;
}

function crearCeldaValoresDiagonales(topValorInicial, bottomValorInicial) {
    const kakuroCell = document.createElement("div");
    kakuroCell.className = "kakuro-cell";

    // Creación de valores diagonales
    const topNumber = document.createElement("div");
    topNumber.className = "kakuro-top-number";
    topNumber.contentEditable = true; // Permitir edición de número
    topNumber.textContent = topValorInicial.toString(); // Valor inicial

    const bottomNumber = document.createElement("div");
    bottomNumber.className = "kakuro-bottom-number";
    bottomNumber.contentEditable = true; // Permitir edición de número
    bottomNumber.textContent = bottomValorInicial.toString(); // Valor inicial

    // Agregar números a la celda Kakuro
    kakuroCell.appendChild(topNumber);
    kakuroCell.appendChild(bottomNumber);

    return kakuroCell;
}

function generateKakuroBoard(rows, columns) {
    const board = [];
    for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < columns; j++) {

            // Se genera de manera intercalada
            if ((i + j) % 2 === 0) {

                // 1. Celda de input
                row.push(crearCeldaInput());

            } else {

                // 2. Celda de valores diagonales
                row.push(crearCeldaValoresDiagonales(1, 2));

            }
        }
        board.push(row);
    }
    return board;
}


// Función para imprimir la matriz en consola

function imprimirMatriz(matriz) {
    for (let i = 0; i < matriz.length; i++) {
        for (let j = 0; j < matriz[i].length; j++) {
            console.log(matriz[i][j]);
        }
    }
}


// Función para imprimir la matriz en HTML (Kakuro board)

function displayKakuroBoard(board) {

    console.log("Tablero...");
    imprimirMatriz(board);

    const table = document.getElementById("matrix-table");
    for (let i = 0; i < board.length; i++) {
        const row = document.createElement("tr");
        for (let j = 0; j < board[i].length; j++) {
            const cell = document.createElement("td");
            const boardElement = board[i][j];

            if (boardElement instanceof HTMLInputElement) {
                // Si es un campo de entrada (input), agregalo a la celda
                cell.appendChild(boardElement);
            } else if (boardElement instanceof HTMLDivElement) {
                // Si es una celda Kakuro (div), agregalo a la celda
                cell.appendChild(boardElement);
            } else {
                // Si no es ninguno de los anteriores, establece el contenido de texto de la celda
                cell.textContent = boardElement;
            }
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
}

// Quitar el comentario
/*
const { rows, columns } = getQueryParams();
const kakuroBoard = generateKakuroBoard(rows, columns);

// Impresión y display del tablero Kakuro
console.log(kakuroBoard);
displayKakuroBoard(kakuroBoard);
*/






// OJO OJO OJO OJO OJO OJO OJO OJO OJO OJO OJO OJO OJO OJO OJO OJO OJO 
// Kakuro de ejemplo para pruebas

function tableroKakuroPruebas(rows, columns) {
    const board = [];
    for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < columns; j++) {

            // 1. Celda de input
            row.push(crearCeldaInput());

        }
        board.push(row);
    }

    // Crear pistas fijas
    board[0][0] = crearCeldaValoresDiagonales(1, 2);
    board[1][1] = crearCeldaValoresDiagonales(1, 2);
    board[2][2] = crearCeldaValoresDiagonales(1, 2);
    board[2][4] = crearCeldaValoresDiagonales(1, 2);


    return board;
}


const { rows, columns } = getQueryParams();
const kakuroBoard = tableroKakuroPruebas(5, 5);

// Impresión y display del tablero Kakuro
console.log(kakuroBoard);
displayKakuroBoard(kakuroBoard);

// OJO OJO OJO OJO OJO OJO OJO OJO OJO OJO OJO OJO OJO OJO OJO OJO OJO 










// ------> Funcionalidad de verificacion del tablero y movimientos

// Crear una lista con las posiciones de las tuplas dentro del tablero

function encontrarCeldasDiagonales(matriz) {
    const celdasDiagonales = [];

    for (let i = 0; i < matriz.length; i++) {
        for (let j = 0; j < matriz[i].length; j++) {
            const celda = matriz[i][j];

            // Verificar si la celda es una celda de valores diagonales
            if (celda.querySelector('.kakuro-top-number') && celda.querySelector('.kakuro-bottom-number')) {
                celdasDiagonales.push([i, j]);
            }
        }
    }

    return celdasDiagonales;
}

// Función para verificar errores en el tablero de Kakuro

function checkErrors(r, c, S, K) {

    // Define una función para comprobar si un número está en el conjunto de números válidos (1-9)
    function isValidNumber(cell) {
        if (cell.type = "number") {
            console.log("La celda es numerica");
            return true;
        }
        return false
    }


    for (const hint of S) {
        console.log("----> Posicion de la tupla actual [" + hint[0] + "][" + hint[1] + "]");

        const row = hint[0]; // Fila de la pista
        const column = hint[1]; // Columna de la pista
        const usedNumbers = new Set(); // Conjunto para rastrear los números utilizados

        // Comprobar fila hacia la derecha
        console.log("Valor de la tupla en [" + row + "][" + column + "]: (" + K[row][column].querySelector(".kakuro-top-number").textContent + ")(" + K[row][column].querySelector(".kakuro-bottom-number").textContent + ")")


        if (K[row][column].querySelector(".kakuro-top-number").textContent !== 0) {
            for (let actualColumn = column + 1; actualColumn < c; actualColumn++) {
                const cell = K[row][actualColumn];
                console.log("Iterando para fila. Pos actual [" + row + "][" + actualColumn + "]");
                console.log("Intentando desreferenciar: " + K[row][actualColumn].value)
                if (K[row][actualColumn].value == '') { console.log("Input Vacio") }

                if (!isValidNumber(cell)) {
                    console.log("Tupla para fila encontrada en [" + row + "][" + actualColumn + "]");
                    break; // Detenerse si se encuentra una tupla (Otra pista)
                }

                if (cell.value !== '' && usedNumbers.has(cell.value)) {
                    console.log("Se encontraron numeros repetidos en la Fila de la secuencia con posicion [" + row + "][" + column + "]. Numero repetido: " + cell.value)
                    return true; // Si se repite un número, devolver verdadero
                }

                console.log("Se añade el valor " + cell.value + " usado a la lista usedNumbers")
                usedNumbers.add(cell.value);
            }

            // Construccion del set secuencial
            const setArray = Array.from(usedNumbers);
            const elementosEnLinea = setArray.join(', ');

            console.log("usedNumbers para FILA de pista en celda [" + row + "][" + column + "] -> " + elementosEnLinea);
        }

        usedNumbers.clear(); // Reinicializar el conjunto antes de verificar la columna

        // Comprobar columna hacia abajo
        if (K[row][column].querySelector(".kakuro-bottom-number").textContent !== 0) {
            for (let actualRow = row + 1; actualRow < r; actualRow++) {
                const cell = K[actualRow][column];
                console.log("Iterando para columna. Pos actual [" + actualRow + "][" + column + "]");
                console.log("Intentando desreferenciar: " + K[actualRow][column].value)
                if (K[actualRow][column].value == '') { console.log("Input Vacio") }

                if (!isValidNumber(cell)) {
                    console.log("Tupla para columna encontrada en [" + actualRow + "][" + column + "]");
                    break; // Detenerse si se encuentra una tupla (Otra pista)
                }

                if (cell.value !== '' && usedNumbers.has(cell.value)) {
                    console.log("Se encontraron numeros repetidos en la Fila de la secuencia con posicion [" + actualRow + "][" + column + "]. Numero repetido: " + cell.value)
                    return true; // Si se repite un número, devolver verdadero
                }

                console.log("Se añade el valor " + cell.value + " usado a la lista usedNumbers")
                usedNumbers.add(cell.value);
            }

            // Construccion del set secuencial
            const setArray = Array.from(usedNumbers);
            const elementosEnLinea = setArray.join(', ');

            console.log("usedNumbers para COLUMNA de pista en celda [" + row + "][" + column + "] -> " + elementosEnLinea);
        }

    }

    return false; // Si no se repiten números en ninguna pista, devolver falso
}

// Mostrar los valores con DOM

const container = document.getElementById('containerTextoChequeo');
const textoChequeo = document.getElementById('textoChequeo');
const verifyButton = document.getElementById("verify-button");

verifyButton.addEventListener("click", function () {
    console.log("El botón 'Chequear Errores' ha sido presionado.");

    // Se crea la lista de las posiciones de las pistas
    listaPosPistas = encontrarCeldasDiagonales(kakuroBoard);
    console.log("Posiciones de las pistas en el tablero: " + JSON.stringify(listaPosPistas))

    // Se verifica si hay errores en el tablero
    value = checkErrors(rows, columns, listaPosPistas, kakuroBoard);

    // Si no hay errores
    if (value == false) {
        // Cambia la visibilidad a "visible"
        container.style.visibility = 'visible';

        // Cambia el texto
        textoChequeo.textContent = 'No hay errores en el tablero!';

        // Después de 5 segundos, vuelve a ocultar la div y restaura el texto
        setTimeout(() => {
            container.style.visibility = 'hidden';
            textoChequeo.textContent = '¿Lograrás solucionarlo?';
        }, 3000);
    }

    // Si hay errores
    else if (value == true) {
        // Cambia la visibilidad a "visible"
        container.style.visibility = 'visible';

        // Cambia el texto
        textoChequeo.textContent = 'Hay errores en el tablero!';

        // Después de 5 segundos, vuelve a ocultar la div y restaura el texto
        setTimeout(() => {
            container.style.visibility = 'hidden';
            textoChequeo.textContent = '¿Lograrás solucionarlo?';
        }, 3000);
    }

    // Se verifica si el usuario ha ganado

});