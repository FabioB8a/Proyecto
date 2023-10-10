// Obtener filas y columnas

function getQueryParams() {
    const queryParams = new URLSearchParams(window.location.search);
    const rows = parseInt(queryParams.get("rows"));
    const columns = parseInt(queryParams.get("columns"));
    console.log(rows);
    console.log(columns);

    // Para pruebas
    return { rows: 5, columns: 5 };

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


function crearCeldaNegra() {
    const kakuroCell = document.createElement("div");
    kakuroCell.className = "kakuro-cell";
    kakuroCell.style.backgroundColor = "black"; // Color de fondo negro
    kakuroCell.style.position = "relative";
    kakuroCell.style.margin = "5%";
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


function generateKakuroBoard(rows, columns) {
    k = initializeMatrix(rows + 1, columns + 1);
    k = fillBlackCells(k, rows + 1, columns + 1);
    k = fillRemainingCells(k, rows + 1, columns + 1);
    console.log("matriz inciial:", k);
    result = horizontalHints(k, rows + 1, columns + 1);
    result = verticalHints(result.k, rows + 1, columns + 1, result.s);
    result = generatehints(result.k, result.s);
    //console.log("k:", result.k);
    return k;
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
        console.log("aux:", aux);
        if (aux.includes(num)) {
            num = getUniqueNumbers(Sc, aux);
            if(num === null){
                k[i][j] = 'X';
            }
            else{
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
    if(getRandomNumberFromList(sc.filter(number => !aux.includes(number))) === undefined){
        return null;
    }
    else{
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
        let startCol = i;
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
            startCol--;

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
        let startCol = j;
        // Iterate from the last column to the first in the current row
        for (let i = r - 1; i >= 0; i--) {
            if (k[i][j] !== 'X' && !Array.isArray(k[i][j])) {
                totalSum += k[i][j];
                console.log("totalSum:", totalSum);
                console.log("k[i][j]:", k[i][j]);
            }
            else {
                    if (totalSum > 0) {
                        if(Array.isArray(k[i][j])){
                            k[i][j][0] = totalSum;
                        }
                        else{
                            k[i][j] = [totalSum, null];
                        }
                        if (!S.some(item => item[0] === i && item[1] === j)) {
                            S.push([i, j]);
                        }
                        totalSum = 0;
                    }
                }

            
            startCol--;
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
            else{
                k[i][j] = crearCeldaInput();
            }
        }
    }

    return { k, S };
}

// Quitar el comentario
const { rows, columns } = getQueryParams();
const kakuroBoard = generateKakuroBoard(rows, columns);

// Impresión y display del tablero Kakuro
console.log(kakuroBoard);
displayKakuroBoard(kakuroBoard);




// Tests - Tablero 
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
    board[0][0] = crearCeldaValoresDiagonales(10, 10);
    board[1][1] = crearCeldaValoresDiagonales(6, 6);
    board[2][2] = crearCeldaValoresDiagonales(3, 3);
    board[3][3] = crearCeldaNegra();
    board[3][4] = crearCeldaNegra();
    board[4][3] = crearCeldaNegra();
    board[4][4] = crearCeldaNegra();

    return board;
}

/*
// const { rows, columns } = getQueryParams();
const { rows, columns } = getQueryParams();
const kakuroBoard = tableroKakuroPruebas(rows, columns);

// Impresión y display del tablero Kakuro
console.log(kakuroBoard);
displayKakuroBoard(kakuroBoard);
*/
// Tests - Tablero 








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

                if (!isValidNumber(cell) && cell.value !== '') {
                    console.log("Tupla para fila encontrada en [" + row + "][" + actualColumn + "]");
                    break; // Detenerse si se encuentra una tupla (Otra pista)
                }

                if (usedNumbers.has(cell.value)) {
                    console.log("Se encontraron numeros repetidos en la Fila de la secuencia con posicion [" + row + "][" + column + "]. Numero repetido: " + cell.value)
                    console.log("checkErrors returned true")
                    return true; // Si se repite un número, devolver verdadero
                }

                if (cell.value !== '') {
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
        if (K[row][column].querySelector(".kakuro-bottom-number").textContent !== 0) {
            for (let actualRow = row + 1; actualRow < r; actualRow++) {
                const cell = K[actualRow][column];
                console.log("Iterando para columna. Pos actual [" + actualRow + "][" + column + "]");
                console.log("Intentando desreferenciar: " + K[actualRow][column].value)
                if (K[actualRow][column].value == '') { console.log("Input Vacio") }

                if (!isValidNumber(cell) && cell.value !== '') {
                    console.log("Tupla para columna encontrada en [" + actualRow + "][" + column + "]");
                    break; // Detenerse si se encuentra una tupla (Otra pista)
                }

                if (usedNumbers.has(cell.value)) {
                    console.log("Se encontraron numeros repetidos en la Fila de la secuencia con posicion [" + actualRow + "][" + column + "]. Numero repetido: " + cell.value)
                    console.log("checkErrors returned true")
                    return true; // Si se repite un número, devolver verdadero
                }

                if (cell.value !== '') {
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


function checkGameCompletion(r, c, S, K) {

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

        if (K[row][column].querySelector(".kakuro-top-number").textContent !== 0) {
            for (let actualColumn = column + 1; actualColumn < c; actualColumn++) {
                const cell = K[row][actualColumn];
                console.log("Iterando para fila. Pos actual [" + row + "][" + actualColumn + "]");
                console.log("Intentando desreferenciar: " + K[row][actualColumn].value)
                if (K[row][actualColumn].value == '') { console.log("Input Vacio") }

                if (cell.value == '') {
                    console.log("checkGameCompletion returned false. Espacio vacio encontrado verificando FILA")
                    return false; // Detenerse si se encuentra un espacio vacio
                }

                if (!isValidNumber(cell)) {
                    console.log("Tupla para fila encontrada en [" + row + "][" + actualColumn + "]");
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
        if (K[row][column].querySelector(".kakuro-bottom-number").textContent !== 0) {
            for (let actualRow = row + 1; actualRow < r; actualRow++) {
                const cell = K[actualRow][column];
                console.log("Iterando para columna. Pos actual [" + actualRow + "][" + column + "]");
                console.log("Intentando desreferenciar: " + K[actualRow][column].value)
                if (K[actualRow][column].value == '') { console.log("Input Vacio") }

                if (cell.value == '') {
                    console.log("checkGameCompletion returned false. Espacio vacio encontrado verificando COLUMNA")
                    return false; // Detenerse si se encuentra un espacio vacio
                }

                if (!isValidNumber(cell)) {
                    console.log("Tupla para columna encontrada en [" + actualRow + "][" + column + "]");
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