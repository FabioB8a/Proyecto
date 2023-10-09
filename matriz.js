// Obtener filas y columna
function getQueryParams() {
    const queryParams = new URLSearchParams(window.location.search);
    const rows = parseInt(queryParams.get("rows"));
    const columns = parseInt(queryParams.get("columns"));
    console.log(rows);
    console.log(columns);
    return { rows, columns };
}

// Función para generar el Kakuro
function generateKakuroBoard(rows, columns) {
    const board = [];
    for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < columns; j++) {

            // Se genera de manera intercalada
            if ((i + j) % 2 === 0) {

                // 1. Celda de input
                const input = document.createElement("input");
                input.type = "number";
                input.min = 1;
                input.max = 9;
                input.className = "kakuro-cell";
                row.push(input);

            } else {

                // 2. Celda de valores diagonales
                const kakuroCell = document.createElement("div");
                kakuroCell.className = "kakuro-cell";
                
                // Creación de valores diagonales
                const topNumber = document.createElement("div");
                topNumber.className = "kakuro-top-number";
                topNumber.contentEditable = true; // Permitir edición de número
                topNumber.textContent = "1"; // Valor inicial (en este caso es uno pero se llena después)
                
                const bottomNumber = document.createElement("div");
                bottomNumber.className = "kakuro-bottom-number";
                bottomNumber.contentEditable = true; // Permitir edición de número
                bottomNumber.textContent = "2"; // Valor inicial (en este caso es dos pero se llena después)
                
                // Append numbers to the Kakuro cell
                kakuroCell.appendChild(topNumber);
                kakuroCell.appendChild(bottomNumber);
                
                row.push(kakuroCell);

            }
        }
        board.push(row);
    }
    return board;
}



function imprimirMatriz(matriz) {
    for (let i = 0; i < matriz.length; i++) {
        for (let j = 0; j < matriz[i].length; j++) {
            console.log(matriz[i][j]);
        }
    }
}


// Función para imprimir la matriz (Kakuro board)
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


const { rows, columns } = getQueryParams();
const kakuroBoard = generateKakuroBoard(rows, columns);

// Impresión y display del tablero Kakuro
console.log(kakuroBoard);
displayKakuroBoard(kakuroBoard);

