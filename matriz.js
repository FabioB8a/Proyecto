// matrix.js

// Function to get query parameters
function getQueryParams() {
    const queryParams = new URLSearchParams(window.location.search);
    const rows = parseInt(queryParams.get("rows"));
    const columns = parseInt(queryParams.get("columns"));
    console.log(rows);
    console.log(columns);
    return { rows, columns };
}

function displayMatrix(matrix) {
    const table = document.getElementById("matrix-table");
    for (let i = 0; i < matrix.length; i++) {
        const row = document.createElement("tr");
        for (let j = 0; j < matrix[i].length; j++) {
            const cell = document.createElement("td");
            cell.textContent = matrix[i][j];
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
}

// Get rows and columns from the URL
const { rows, columns } = getQueryParams();
// Create the matrix with the specified rows and columns
const matrix = [];
for (let i = 0; i < rows; i++) {
    matrix.push([]);
    for (let j = 0; j < columns; j++) {
        // Initialize matrix values as needed
        // In this example, it's initialized with zeros.
        matrix[i][j] = 0;
    }
}
console.log(matrix);
displayMatrix(matrix);