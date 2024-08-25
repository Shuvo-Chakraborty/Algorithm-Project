document.addEventListener("DOMContentLoaded", function() {
    const sudokuGrid = document.getElementById('sudoku-grid');
    for (let row = 0; row < 9; row++) {
        const tr = document.createElement('tr');
        for (let col = 0; col < 9; col++) {
            const td = document.createElement('td');
            const input = document.createElement('input');
            input.setAttribute('type', 'number');
            input.setAttribute('min', '1');
            input.setAttribute('max', '9');
            td.appendChild(input);
            tr.appendChild(td);
        }
        sudokuGrid.appendChild(tr);
    }
});

function solveSudoku() {
    const grid = getGridValues();
    if (solve(grid)) {
        setGridValues(grid);
    } else {
        alert("No solution exists!");
    }
}

function getGridValues() {
    const grid = [];
    const rows = document.querySelectorAll('#sudoku-grid tr');
    rows.forEach((row, rowIndex) => {
        const cols = row.querySelectorAll('td input');
        grid[rowIndex] = [];
        cols.forEach((col, colIndex) => {
            grid[rowIndex][colIndex] = col.value ? parseInt(col.value) : 0;
        });
    });
    return grid;
}

function setGridValues(grid) {
    const rows = document.querySelectorAll('#sudoku-grid tr');
    rows.forEach((row, rowIndex) => {
        const cols = row.querySelectorAll('td input');
        cols.forEach((col, colIndex) => {
            col.value = grid[rowIndex][colIndex] || '';
        });
    });
}

function solve(grid) {
    const emptySpot = findEmptySpot(grid);
    if (!emptySpot) {
        return true; // Puzzle solved
    }

    const [row, col] = emptySpot;
    for (let num = 1; num <= 9; num++) {
        if (isValidPlacement(grid, row, col, num)) {
            grid[row][col] = num;
            if (solve(grid)) {
                return true;
            }
            grid[row][col] = 0;
        }
    }
    return false;
}

function findEmptySpot(grid) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (grid[row][col] === 0) {
                return [row, col];
            }
        }
    }
    return null;
}

function isValidPlacement(grid, row, col, num) {
    // Check row
    for (let x = 0; x < 9; x++) {
        if (grid[row][x] === num) {
            return false;
        }
    }

    // Check column
    for (let y = 0; y < 9; y++) {
        if (grid[y][col] === num) {
            return false;
        }
    }

    // Check 3x3 grid
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (grid[startRow + i][startCol + j] === num) {
                return false;
            }
        }
    }

    return true;
}