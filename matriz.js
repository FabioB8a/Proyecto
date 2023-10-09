// matrix.js

// Función para obtener los valores de filas y columnas de la URL
function getQueryParams() {
    const queryParams = new URLSearchParams(window.location.search);
    const rows = parseInt(queryParams.get("rows"));
    const columns = parseInt(queryParams.get("columns"));
    return { rows, columns };
}

// Obtén los valores de filas y columnas de la URL
const { rows, columns } = getQueryParams();

// Crear la matriz con las filas y columnas especificadas
const matrix = [];
for (let i = 0; i < rows; i++) {
    matrix.push([]);
    for (let j = 0; j < columns; j++) {
        // Aquí puedes inicializar los valores de la matriz según tus necesidades
        // En este ejemplo, simplemente se llena con ceros.
        matrix[i][j] = 0;
    }
}

// Exporta la matriz para que esté disponible en otros scripts si es necesario
export { matrix };
