// matrix.js

// Obtener filas y columna
function getQueryParams() {
    const queryParams = new URLSearchParams(window.location.search);
    const rows = parseInt(queryParams.get("rows"));
    const columns = parseInt(queryParams.get("columns"));
    console.log(rows);
    console.log(columns);
    return { rows, columns };
}

// Function to generate a Kakuro board
function generateKakuroBoard(rows, columns) {
    const board = [];
    for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < columns; j++) {
            if (i % 2 === 0 && j % 2 === 0) {
                // Fill even-indexed rows and columns with input fields
                const input = document.createElement("input");
                input.type = "number";
                input.min = 1;
                input.max = 9;
                input.className = "kakuro-cell";
                row.push(input);
            } else {
                // Fill other cells as empty spaces
                const kakuroCell = document.createElement("div");
                kakuroCell.className = "kakuro-cell";
                
                // Create the diagonal numbers
                const topNumber = document.createElement("div");
                topNumber.className = "kakuro-top-number";
                topNumber.contentEditable = true; // Allow user to edit the number
                topNumber.textContent = "1"; // Initial value (you can set it as you like)
                
                const bottomNumber = document.createElement("div");
                bottomNumber.className = "kakuro-bottom-number";
                bottomNumber.contentEditable = true; // Allow user to edit the number
                bottomNumber.textContent = "2"; // Initial value (you can set it as you like)
                
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

// Imprimir la matriz (Kakuro board)
function displayKakuroBoard(board) {
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

