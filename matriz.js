// JS asociado al tablero



// Funciones para generar el Kakuro

// Funcion para generar celdas de entrada en la matriz

function crearCeldaInput() {
    const input = document.createElement("input");
    input.type = "number";
    input.min = 1;
    input.max = 9;
    input.className = "kakuro-cell";
    return input;
}


// Funcion para crear pistas en la matriz

function crearCeldaValoresDiagonales(topValorInicial, bottomValorInicial) {
    const kakuroCell = document.createElement("div");
    kakuroCell.className = "kakuro-cell";
    kakuroCell.style.backgroundColor = "black"; // Color de fondo negro
    kakuroCell.style.position = "relative";
    kakuroCell.style.margin = "5%";

    // Creación de valores diagonales
    const diagonal = document.createElement("div");
    diagonal.className = "kakuro-diagonal";
    diagonal.style.width = "5%";
    diagonal.style.height = "140%";
    diagonal.style.position = "absolute";
    diagonal.style.transform = "rotate(-50deg)";
    diagonal.style.backgroundColor = "white"; // Color de la diagonal blanca
    diagonal.style.zIndex = "1"; // Asegurar que la diagonal esté encima de los números

    const topNumber = document.createElement("div");
    topNumber.className = "kakuro-top-number";
    topNumber.contentEditable = false; // Permitir edición de número
    topNumber.textContent = topValorInicial !== undefined && topValorInicial !== null ? topValorInicial.toString() : ''; // Valor inicial
    topNumber.style.color = "white"; // Color de texto blanco
    topNumber.style.position = "absolute";
    topNumber.style.left = "30%"; // Ajustar posición del número
    topNumber.style.top = "20%";

    const bottomNumber = document.createElement("div");
    bottomNumber.className = "kakuro-bottom-number";
    bottomNumber.contentEditable = false; // Permitir edición de número
    bottomNumber.textContent = bottomValorInicial !== undefined && bottomValorInicial !== null ? bottomValorInicial.toString() : ''; // Valor inicial
    bottomNumber.style.color = "white"; // Color de texto blanco
    bottomNumber.style.position = "absolute";
    bottomNumber.style.left = "-20%"; // Ajustar posición del número
    bottomNumber.style.bottom = "10%"; // Colocar en la diagonal inferior

    // Agregar la diagonal y los números a la celda Kakuro
    kakuroCell.appendChild(diagonal);
    kakuroCell.appendChild(topNumber);
    kakuroCell.appendChild(bottomNumber);

    return kakuroCell;
}

// Función para crear celdas negras en la matriz

function crearCeldaNegra() {
    const kakuroCell = document.createElement("div");
    kakuroCell.className = "kakuro-cell";
    kakuroCell.style.backgroundColor = "black"; // Color de fondo negro
    kakuroCell.style.position = "relative";
    kakuroCell.style.margin = "5%";
    return kakuroCell;
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





//
// INICIO
// TRADUCCION Y GENERACION BASADA EN EL ARCHIVO DEL KAKURO

function generateKakuroBoard_BaseEjemplo(rows, columns) {
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

function loadKakuroBoardTESTS(width, height, data) {

    console.log(`Cargue de archivo con ancho ${width}, alto ${height} y datos:`, data);

    const board = [];
    for (let i = 0; i < height; i++) {
        const row = [];
        for (let j = 0; j < width; j++) {
            const value = data.find(item => item.i === i && item.j === j);

            if (j == 0) {
                row.push(crearCeldaValoresDiagonales(1, ''));
            }

            if (value && j != 1) {
                row.push(crearCeldaInput());

            } else {
                // La celda no tiene un valor en data, es de tipo input
                row.push(crearCeldaInput());
            }
        }
        board.push(row);
    }

    console.log("Tablero cargado:", board);
    return board;

}


function loadKakuroBoard(width, height, data) {

    console.log(`Cargue de archivo con ancho ${width}, alto ${height} y datos:`, data);

    const board = [];
    for (let i = 0; i < height; i++) {
        const row = [];
        for (let j = 0; j < width; j++) {
            const value = data.find(item => item.i === i && item.j === j);

            if (value) {
                // La celda tiene un valor, verificar si es negra o no
                if (value.n === -1 && value.m === -1) {
                    // Ambas direcciones son negras
                    row.push(crearCeldaNegra());
                } else {
                    // Al menos una dirección tiene un valor
                    if (value.n === -1) { row.push(crearCeldaValoresDiagonales(value.m, '')); }
                    else if (value.m === -1) { row.push(crearCeldaValoresDiagonales('', value.n)); }
                }
            } else {
                // La celda no tiene un valor en data, es de tipo input
                row.push(crearCeldaInput());
            }
        }
        board.push(row);
    }

    console.log("Tablero cargado:", board);
    return board;

}

//
// FIN
// TRADUCCION Y GENERACION BASADA EN EL ARCHIVO DEL KAKURO





//
// INICIO
// GENERACION DEL KAKURO

function generateKakuroBoard(rows, columns) {

    console.log(`Partida autogenerada con ${rows} filas y ${columns} columnas.`);

    k = initializeMatrix(rows + 1, columns + 1);
    k = fillBlackCells(k, rows + 1, columns + 1);
    k = fillRemainingCells(k, rows + 1, columns + 1);
    result = horizontalHints(k, rows + 1, columns + 1);
    result = verticalHints(result.k, rows + 1, columns + 1, result.s);
    result = generatehints(result.k, result.s);
    return result.k;
}

function initializeMatrix(rows, cols) {
    k = createEmptyMatrix(rows, cols);
    for (let i = 0; i < rows; i++) {
        k[i][0] = 'X';
    }
    for (let j = 0; j < cols; j++) {
        k[0][j] = 'X';
    }
    return k;

}

function createEmptyMatrix(rows, cols) {
    let matrix = [];
    for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < cols; j++) {
            row.push(null);
        }
        matrix.push(row);
    }
    return matrix;
}

function fillBlackCells(k, r, c) {
    const targetBlackCount = Math.floor((r * c) / 3);
    let currentBlackCount = 0;

    while (currentBlackCount < targetBlackCount) {
        const i = Math.floor(Math.random() * r);  // Generar fila aleatoria
        const j = Math.floor(Math.random() * c);  // Generar columna aleatoria

        if (k[i][j] !== 'X') {
            k[i][j] = 'X';
            currentBlackCount++;
        }
    }

    return k;
}


function fillRemainingCells(k, rows, columns) {
    let i = 0;
    let j = 0;
    const Sc = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    while (i < rows && j < columns) {
        if (k[i][j] !== null) {
            j++;
            if (j === columns) {
                i++;
                j = 0;
            }
            continue;
        }

        let num = Math.floor(Math.random() * 9) + 1;  // Random entre 1 y 9
        let aux = [];

        let l = i;
        while (l > 0 && l < rows && j > 0 && j < columns && k[l][j] !== 'X') {
            aux.push(k[l][j]);
            l--;
        }

        l = j;
        while (l >= 0 && i < rows && l < columns && k[i][l] !== 'X') {
            aux.push(k[i][l]);
            l--;
        }
        if (aux.includes(num)) {
            num = getUniqueNumbers(Sc, aux);
            if (num === null) {
                k[i][j] = 'X';
            }
            else {
                k[i][j] = num;
            }
        } else {
            k[i][j] = num;
        }

        j++;
        if (j === columns) {
            i++;
            j = 0;
        }
    }
    return k;
}

function getUniqueNumbers(sc, aux) {
    // Filtrar los números en sc que no están en aux
    if (getRandomNumberFromList(sc.filter(number => !aux.includes(number))) === undefined) {
        return null;
    }
    else {
        return getRandomNumberFromList(sc.filter(number => !aux.includes(number)));
    }
}

function getRandomNumberFromList(numbersList) {
    // Generar un índice aleatorio dentro de la lista
    const randomIndex = Math.floor(Math.random() * numbersList.length);
    // Retornar el número aleatorio obtenido
    return numbersList[randomIndex];
}
// Función para imprimir la matriz en consola

function horizontalHints(k, r, c) {
    let S = [];
    // Iterate from the last row to the first
    for (let i = r - 1; i >= 0; i--) {
        let totalSum = 0;
        // Iterate from the last column to the first in the current row
        for (let j = c - 1; j >= 0; j--) {
            if (k[i][j] !== 'X') {
                totalSum += k[i][j];
            }
            else {
                if (totalSum > 0) {
                    k[i][j] = [null, totalSum];
                    S.push([i, j]);
                    totalSum = 0;
                }
            }

        }
    }
    return { k, S };
}


function verticalHints(k, r, c, S) {
    if (!S) {
        S = [];  // Inicializa S como un arreglo vacío si es undefined
    }
    // Recorremos de derecha a izquierda y de abajo hacia arrib
    for (let j = c - 1; j >= 0; j--) {
        let totalSum = 0;
        // Iterate from the last column to the first in the current row
        for (let i = r - 1; i >= 0; i--) {
            if (k[i][j] !== 'X' && !Array.isArray(k[i][j])) {
                totalSum += k[i][j];
            }
            else {
                if (totalSum > 0) {
                    if (Array.isArray(k[i][j])) {
                        k[i][j][0] = totalSum;
                    }
                    else {
                        k[i][j] = [totalSum, null];
                    }
                    if (!S.some(item => item[0] === i && item[1] === j)) {
                        S.push([i, j]);
                    }
                    totalSum = 0;
                }
            }

        }
    }
    return { k, S };
}

function generatehints(k, S) {
    for (i = 0; i < k.length; i++) {
        for (j = 0; j < k[i].length; j++) {
            if (k[i][j] === 'X') {
                k[i][j] = crearCeldaNegra();
            }
            else if (Array.isArray(k[i][j])) {
                k[i][j] = crearCeldaValoresDiagonales(k[i][j][1], k[i][j][0]);
            }
            else {
                k[i][j] = crearCeldaInput();
            }
        }
    }

    return { k, S };
}

//
// FIN
// GENERACION DEL KAKURO





// INICIALIZACION DEL TABLERO

// Variables globales
let rows, columns, width, height, data, kakuroBoard;

// Obtener filas y columnas - Tablero autogenerado
function getQueryParams_autoGeneratedGame() {
    const queryParams = new URLSearchParams(window.location.search);
    rows = parseInt(queryParams.get("rows"));
    columns = parseInt(queryParams.get("columns"));

    // Para pruebas
    //return { rows: 5, columns: 5 };

    return { rows, columns };
}

// Obtener datos de carga de archivo
function getQueryParams_loadedGame() {
    const queryParams = new URLSearchParams(window.location.search);
    width = parseInt(queryParams.get("width"));
    height = parseInt(queryParams.get("height"));
    data = JSON.parse(decodeURIComponent(queryParams.get("data")));

    return { width, height, data };
}

// Se obtienen los parametros de la URL
const urlParams = new URLSearchParams(window.location.search);

// Verificar la cantidad de parámetros. SI ES AUTOGENERADO
if (urlParams.has('rows') && urlParams.has('columns')) {
    // Hay 2 parámetros (rows y columns)
    getQueryParams_autoGeneratedGame();
    kakuroBoard = generateKakuroBoard(rows, columns);

    // Verificar la cantidad de parámetros. SI ES CARGADO DE ARCHIVO
} else if (urlParams.has('width') && urlParams.has('height') && urlParams.has('data')) {
    // Hay 3 parámetros (width, height y data)
    getQueryParams_loadedGame();

    // Necesario para el funcionamiento de las verificaciones y finalizacion del juego
    rows = height - 1; // Se resta 1 por el manejo actual de filas (Se esta sumando 1 actualmente)
    columns = width - 1; // Se resta 1 por el manejo actual de columnas (Se esta sumando 1 actualmente)

    kakuroBoard = loadKakuroBoard(width, height, data);

} else {
    console.log('Error: Parámetros no válidos.');
    alert('Error: Parámetros no válidos.');
}

// Impresión y display del tablero Kakuro
console.log(kakuroBoard);
displayKakuroBoard(kakuroBoard);








// Tests - Tablero 
// Kakuro de ejemplo para pruebas

/*
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
    board[0][0] = crearCeldaValoresDiagonales(10, 10);
    board[1][1] = crearCeldaValoresDiagonales(6, 6);
    board[2][2] = crearCeldaValoresDiagonales(3, 3);
    board[3][3] = crearCeldaNegra();
    board[3][4] = crearCeldaNegra();
    board[4][3] = crearCeldaNegra();
    board[4][4] = crearCeldaNegra();

    return board;
}


// const { rows, columns } = getQueryParams_autoGeneratedGame();
const { rows, columns } = getQueryParams_autoGeneratedGame();
const kakuroBoard = tableroKakuroPruebas(rows, columns);

// Impresión y display del tablero Kakuro
console.log(kakuroBoard);
displayKakuroBoard(kakuroBoard);
*/








// ------> Funcionalidad de verificacion del tablero y movimientos

// Crear una lista con las posiciones de las tuplas dentro del tablero


// Funcion para encontrar las celdas que tienen valores diagonales (pistas)

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

    console.log("\n\n... Chequeo de errores ...")

    for (const hint of S) {
        console.log("----> Posicion de la tupla actual [" + hint[0] + "][" + hint[1] + "]");

        const row = hint[0]; // Fila de la pista
        const column = hint[1]; // Columna de la pista
        const usedNumbers = new Set(); // Conjunto para rastrear los números utilizados

        // Comprobar fila hacia la derecha
        console.log("Valor de la tupla en [" + row + "][" + column + "]: (" + K[row][column].querySelector(".kakuro-top-number").textContent + ")(" + K[row][column].querySelector(".kakuro-bottom-number").textContent + ")")


        if (K[row][column].querySelector(".kakuro-top-number").textContent !== '') {
            for (let actualColumn = column + 1; actualColumn <= c; actualColumn++) {
                const cell = K[row][actualColumn];
                console.log("Iterando para fila. Pos actual [" + row + "][" + actualColumn + "]");
                console.log("Intentando desreferenciar: " + K[row][actualColumn].value)

                if (K[row][actualColumn].value == '' && K[row][actualColumn].value != undefined) { console.log("Input Vacio") }

                if (K[row][actualColumn].value == undefined) {
                    console.log("Tupla o espacio vacio para fila encontrado en [" + row + "][" + actualColumn + "]");
                    break; // Detenerse si se encuentra una tupla (Otra pista)
                }

                if (usedNumbers.has(cell.value) && cell.value !== '' && cell.value !== undefined) {
                    console.log("Se encontraron numeros repetidos en la Fila de la secuencia con posicion [" + row + "][" + actualColumn + "]. Numero repetido: " + cell.value)
                    console.log("checkErrors returned true")
                    return true; // Si se repite un número, devolver verdadero
                }

                if (cell.value !== '' && cell.value !== undefined) {
                    console.log("Se añade el valor " + cell.value + " usado a la lista usedNumbers")
                    usedNumbers.add(cell.value);
                }
            }

            // Construccion del set secuencial
            const setArray = Array.from(usedNumbers);
            const elementosEnLinea = setArray.join(', ');

            console.log("usedNumbers para FILA de pista en celda [" + row + "][" + column + "] -> " + elementosEnLinea);
        }

        usedNumbers.clear(); // Reinicializar el conjunto antes de verificar la columna

        // Comprobar columna hacia abajo
        if (K[row][column].querySelector(".kakuro-bottom-number").textContent !== '') {
            for (let actualRow = row + 1; actualRow <= r; actualRow++) {
                const cell = K[actualRow][column];
                console.log("Iterando para columna. Pos actual [" + actualRow + "][" + column + "]");
                console.log("Intentando desreferenciar: " + K[actualRow][column].value)

                if (K[actualRow][column].value == '' && K[actualRow][column].value != undefined) { console.log("Input Vacio") }

                if (K[actualRow][column].value == undefined) {
                    console.log("Tupla o espacio vacio para columna encontrado en [" + actualRow + "][" + column + "]");
                    break; // Detenerse si se encuentra una tupla (Otra pista)
                }

                if (usedNumbers.has(cell.value) && cell.value !== '' && cell.value !== undefined) {
                    console.log("Se encontraron numeros repetidos en la Fila de la secuencia con posicion [" + actualRow + "][" + column + "]. Numero repetido: " + cell.value)
                    console.log("checkErrors returned true")
                    return true; // Si se repite un número, devolver verdadero
                }

                if (cell.value !== '' && cell.value !== undefined) {
                    console.log("Se añade el valor " + cell.value + " usado a la lista usedNumbers")
                    usedNumbers.add(cell.value);
                }
            }

            // Construccion del set secuencial
            const setArray = Array.from(usedNumbers);
            const elementosEnLinea = setArray.join(', ');

            console.log("usedNumbers para COLUMNA de pista en celda [" + row + "][" + column + "] -> " + elementosEnLinea);
        }

    }

    console.log("checkErrors returned false")
    return false; // Si no se repiten números en ninguna pista, devolver falso
}


// Funcion para verificar si ya termino el juego

function checkGameCompletion(r, c, S, K) {

    console.log("\n\n... Chequeo de completitud del juego ...")

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
        let rowHintValue = 0;
        let columnHintValue = 0;

        // Comprobar fila hacia la derecha
        console.log("Valor de la tupla en [" + row + "][" + column + "]: (" + K[row][column].querySelector(".kakuro-top-number").textContent + ")(" + K[row][column].querySelector(".kakuro-bottom-number").textContent + ")")

        if (K[row][column].querySelector(".kakuro-top-number").textContent !== '') {
            for (let actualColumn = column + 1; actualColumn <= c; actualColumn++) {
                const cell = K[row][actualColumn];
                console.log("Iterando para fila. Pos actual [" + row + "][" + actualColumn + "]");
                console.log("Intentando desreferenciar: " + K[row][actualColumn].value)
                if (K[row][actualColumn].value == '') { console.log("Input Vacio") }

                if (K[row][actualColumn].value == '' && K[row][actualColumn].value != undefined) {
                    console.log("checkGameCompletion returned false. Espacio vacio encontrado verificando FILA")
                    return false; // Detenerse si se encuentra un espacio vacio
                }

                if (K[row][actualColumn].value == undefined) {
                    console.log("Tupla o espacio vacio para fila encontrada en [" + row + "][" + actualColumn + "]");
                    break; // Detenerse si se encuentra una tupla (Otra pista)
                }

                rowHintValue += parseInt(cell.value);
                console.log("current rowHintValue = " + rowHintValue);

            }

            // Verificacion de la suma
            if (rowHintValue != parseInt(K[row][column].querySelector(".kakuro-top-number").textContent)) {
                console.log("checkGameCompletion returned false. rowHintValue: " + rowHintValue + "!= " + parseInt(K[row][column].querySelector(".kakuro-top-number").textContent))
                return false
            }
            console.log("La suma de los valores correspondientes, es igual al valor de la pista en la FILA")
        }

        // Comprobar columna hacia abajo
        if (K[row][column].querySelector(".kakuro-bottom-number").textContent !== '') {
            for (let actualRow = row + 1; actualRow <= r; actualRow++) {
                const cell = K[actualRow][column];
                console.log("Iterando para columna. Pos actual [" + actualRow + "][" + column + "]");
                console.log("Intentando desreferenciar: " + K[actualRow][column].value)
                if (K[actualRow][column].value == '') { console.log("Input Vacio") }

                if (K[actualRow][column].value == '' && K[actualRow][column].value != undefined) {
                    console.log("checkGameCompletion returned false. Espacio vacio encontrado verificando COLUMNA")
                    return false; // Detenerse si se encuentra un espacio vacio
                }

                if (K[actualRow][column].value == undefined) {
                    console.log("Tupla o espacio vacio para columna encontrada en [" + actualRow + "][" + column + "]");
                    break; // Detenerse si se encuentra una tupla (Otra pista)
                }

                columnHintValue += parseInt(cell.value);
                console.log("current columnHintValue = " + columnHintValue);


            }

            // Verificacion de la suma
            if (columnHintValue != parseInt(K[row][column].querySelector(".kakuro-bottom-number").textContent)) {
                console.log("checkGameCompletion returned false. columnHintValue: " + columnHintValue + "!= " + parseInt(K[row][column].querySelector(".kakuro-bottom-number").textContent))
                return false
            }
            console.log("La suma de los valores correspondientes, es igual al valor de la pista en la COLUMNA")
        }

    }

    console.log("checkGameCompletion returned true")
    return true; // Si todas las sumas corresponden a las pistas, termina el juego
}




// Mostrar los valores con DOM

const container = document.getElementById('containerTextoChequeo');
const textoChequeo = document.getElementById('textoChequeo');
const verifyButton = document.getElementById("verify-button");
const solveButton = document.getElementById("solve-button");

verifyButton.addEventListener("click", function () {
    console.log("El botón 'Chequear Errores' ha sido presionado.");

    // Se crea la lista de las posiciones de las pistas
    listaPosPistas = encontrarCeldasDiagonales(kakuroBoard);
    console.log("Posiciones de las pistas en el tablero: " + JSON.stringify(listaPosPistas))

    // Se verifica si hay errores en el tablero
    value = checkErrors(rows, columns, listaPosPistas, kakuroBoard);

    // Se verifica si el usuario ha ganado
    gameStatus = checkGameCompletion(rows, columns, listaPosPistas, kakuroBoard);

    // Si el usuario no ha ganado, se le muestran los errores
    if (gameStatus == false) {

        // Si no hay errores
        if (value == false) {
            // Cambia la visibilidad a "visible"
            container.style.visibility = 'visible';

            // Cambia el texto
            textoChequeo.textContent = 'No hay errores en el tablero! Sigue intentando ganar';
            textoChequeo.style.color = 'green';

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
            textoChequeo.style.color = 'red';

            // Después de 5 segundos, vuelve a ocultar la div y restaura el texto
            setTimeout(() => {
                container.style.visibility = 'hidden';
                textoChequeo.textContent = '¿Lograrás solucionarlo?';
            }, 3000);
        }

    }

    else {

        // Cambia la visibilidad a "visible"
        container.style.visibility = 'visible';

        // Cambia el texto
        textoChequeo.textContent = 'Felicidades, ganaste!';
        textoChequeo.style.color = 'green';

    }


});

solveButton.addEventListener("click", function () {
    console.log("El botón 'Chequear Errores' ha sido presionado.");

    // Se crea la lista de las posiciones de las pistas
    listaPosPistas = encontrarCeldasDiagonales(kakuroBoard);
    console.log("Posiciones de las pistas en el tablero: " + JSON.stringify(listaPosPistas))

    // Se soluciona el tablero
    value = solveKakuro(rows, columns, listaPosPistas, kakuroBoard);


});
































function solveKakuro(r, c, S, K) {

    console.log("\n\n... solveKakuro ...")

    for (const hint of S) {
        cantVaciasFila = 0;
        cantVaciasColumna = 0;
        valorPistaFila = 0;
        valorPistaColumna = 0;
        valorActualPistaColumna = 0;
        valorActualPistaFila = 0;
        listaActualFila = [];
        listaActualColumna = [];

        console.log("----> Posicion de la tupla actual [" + hint[0] + "][" + hint[1] + "]");

        const row = hint[0]; // Fila de la pista
        const column = hint[1]; // Columna de la pista
        const usedNumbers = new Set(); // Conjunto para rastrear los números utilizados

        // Comprobar fila hacia la derecha
        console.log("Valor de la tupla en [" + row + "][" + column + "]: (" + K[row][column].querySelector(".kakuro-top-number").textContent + ")(" + K[row][column].querySelector(".kakuro-bottom-number").textContent + ")")


        if (K[row][column].querySelector(".kakuro-top-number").textContent !== '') {
            valorPistaFila = K[row][column].querySelector(".kakuro-top-number").textContent;

            for (let actualColumn = column + 1; actualColumn <= c; actualColumn++) {
                const cell = K[row][actualColumn];
                console.log("Iterando para fila. Pos actual [" + row + "][" + actualColumn + "]");
                console.log("Intentando desreferenciar: " + K[row][actualColumn].value)

                if (K[row][actualColumn].value == undefined) {
                    console.log("Tupla o espacio vacio para columna encontrada en [" + row + "][" + actualColumn + "]");
                    break; // Detenerse si se encuentra una tupla (Otra pista)
                }

                if (K[row][actualColumn].value == '') { console.log("Input Vacio"); cantVaciasFila++; }
                else {
                    valorActualPistaFila = valorActualPistaFila + parseFloat(K[row][actualColumn].value)
                    listaActualFila.push(K[row][actualColumn].value)
                }


            }


            // Construccion del set secuencial
            const setArray = Array.from(usedNumbers);
            const elementosEnLinea = setArray.join(', ');

            console.log("usedNumbers para FILA de pista en celda [" + row + "][" + column + "] -> " + elementosEnLinea);
        }

        usedNumbers.clear(); // Reinicializar el conjunto antes de verificar la columna

        // Comprobar columna hacia abajo
        if (K[row][column].querySelector(".kakuro-bottom-number").textContent !== '') {
            valorPistaColumna = K[row][column].querySelector(".kakuro-top-number").textContent;

            for (let actualRow = row + 1; actualRow <= r; actualRow++) {
                const cell = K[actualRow][column];
                console.log("Iterando para columna. Pos actual [" + actualRow + "][" + column + "]");
                console.log("Intentando desreferenciar: " + K[actualRow][column].value)

                if (K[actualRow][column].value == undefined) {
                    console.log("Tupla o espacio vacio para columna encontrada en [" + actualRow + "][" + column + "]");
                    break; // Detenerse si se encuentra una tupla (Otra pista)
                }

                if (K[actualRow][column].value == '') { console.log("Input Vacio"); cantVaciasColumna++; }
                else {
                    valorActualPistaColumna = valorActualPistaColumna + parseFloat(K[actualRow][column].value)
                    listaActualColumna.push(K[actualRow][column].value)

                }

            }


            // Construccion del set secuencial
            const setArray = Array.from(usedNumbers);
            const elementosEnLinea = setArray.join(', ');

            console.log("usedNumbers para COLUMNA de pista en celda [" + row + "][" + column + "] -> " + elementosEnLinea);
        }

        console.log("\n<---- POSICIONES DE LAS PISTAS de la posicion " + row + "," + column + " con valores de pista " + valorPistaFila + "," + valorPistaColumna + " para fila y columna respectivamente")
        console.log("POSICIONES VACIAS DE LAS PISTAS (FILA) -> " + cantVaciasFila)
        console.log("POSICIONES VACIAS DE LAS PISTAS (COLUMNA) -> " + cantVaciasColumna)
        console.log("Valor ACTUAL  (FILA) -> " + valorActualPistaFila)
        console.log("Valor ACTUAL (COLUMNA) -> " + valorActualPistaColumna)
        console.log("Lista ACTUAL (FILA) -> " + listaActualFila)
        console.log("Lista ACTUAL (COLUMNA) -> " + listaActualColumna)

        //Combinaciones para la fila
        if (valorPistaFila !== 0) {
            elementsFila = [];
            for (let i = 1; i <= 9; i++) {
                if (i < valorPistaFila) {
                    elementsFila.push(i);
                }

            }
            console.log("Elementos para la fila: " + elementsFila)

            const combinationsRow = getCombinationsWithSum(elementsFila, cantVaciasFila, valorPistaFila, listaActualFila);

            console.log("Combinaciones para la fila: " + combinationsRow)
            for (const combination of combinationsRow) {
                console.log(combination.join(', '));
            }
        }

        if (valorPistaColumna !== 0) {
            //Combinaciones para la columna
            elementsColumna = [];
            for (let i = 1; i <= 9; i++) {
                if (i < valorPistaColumna) {
                    elementsColumna.push(i);
                }

            }
            console.log("Elementos para la columna: " + elementsColumna)
            const combinationsColumn = getCombinationsWithSum(elementsColumna, cantVaciasColumna, valorPistaColumna, listaActualColumna);
            console.log("Combinaciones para la columna: " + combinationsColumn)
            for (const combination of combinationsColumn) {
                console.log(combination.join(', '));
            }
        }

    }

    return false; // Si no se repiten números en ninguna pista, devolver falso
}


function getCombinationsWithSum(elements, size, targetSum, currentCombination = [], startIndex = 0) {
    const combinations = [];

    if (size === 0 && targetSum === 0) {
        combinations.push([...currentCombination]);
        return combinations;
    }

    for (let i = startIndex; i < elements.length; i++) {
        if (targetSum - elements[i] >= 0 ) {
            currentCombination.push(elements[i]);
            combinations.push(
                ...getCombinationsWithSum(elements, size - 1, targetSum - elements[i], currentCombination, i + 1)
            );
            currentCombination.pop();
        }
    }

    return combinations;
}