// Variables
const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const resetButton = document.getElementById('reset');
const backToMenuButton = document.getElementById('back-to-menu');
const endGameButton = document.getElementById('end-game');
const gameOptions = document.querySelector('.game-options');
const boardDiv = document.querySelector('.board');
const gameControls = document.querySelector('.game-controls');
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', '']; // Representación del tablero
let gameMode = ''; // Modo de juego (dos jugadores o contra la máquina)

// Función para elegir el modo de juego
document.getElementById('two-players').addEventListener('click', () => {
    gameMode = 'two-players';
    startGame();
});

document.getElementById('vs-machine').addEventListener('click', () => {
    gameMode = 'vs-machine';
    startGame();
});

// Iniciar el juego
function startGame() {
    gameOptions.style.display = 'none';
    boardDiv.style.display = 'grid';
    gameControls.style.display = 'block';
    resetButton.style.display = 'block';
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    cells.forEach(cell => cell.textContent = '');
    message.textContent = '';
}

// Función para manejar el click en las celdas
function handleClick(event) {
    const cellIndex = event.target.id.split('-')[1];

    // Si la celda ya está ocupada o el juego ha terminado, no hacer nada
    if (board[cellIndex] !== '' || message.textContent !== '') {
        return;
    }

    // Coloca la marca del jugador actual en la celda
    board[cellIndex] = currentPlayer;
    event.target.textContent = currentPlayer;

    // Verifica si el jugador ha ganado
    if (checkWin()) {
        message.textContent = `¡Jugador ${currentPlayer} ha ganado!`;
        return;
    }

    // Verifica si hay empate
    if (board.every(cell => cell !== '')) {
        message.textContent = '¡Empate!';
        return;
    }

    // Cambia al siguiente jugador
    currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';

    // Si el modo es contra la máquina, hace la jugada de la IA
    if (gameMode === 'vs-machine' && currentPlayer === 'O') {
        setTimeout(machineMove, 500); // Retardo para simular IA
    }
}

// Función para hacer la jugada de la máquina
function machineMove() {
    const availableMoves = board.map((value, index) => value === '' ? index : -1).filter(index => index !== -1);
    const randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
    board[randomMove] = 'O';
    document.getElementById(`cell-${randomMove}`).textContent = 'O';

    // Verifica si la máquina ha ganado
    if (checkWin()) {
        message.textContent = '¡La máquina ha ganado!';
        return;
    }

    // Verifica si hay empate
    if (board.every(cell => cell !== '')) {
        message.textContent = '¡Empate!';
        return;
    }

    // Cambia al jugador
    currentPlayer = 'X';
}

// Función para verificar si un jugador ha ganado
function checkWin() {
    const winPatterns = [
        [0, 1, 2], // Fila superior
        [3, 4, 5], // Fila del medio
        [6, 7, 8], // Fila inferior
        [0, 3, 6], // Columna izquierda
        [1, 4, 7], // Columna del medio
        [2, 5, 8], // Columna derecha
        [0, 4, 8], // Diagonal de arriba a abajo
        [2, 4, 6], // Diagonal de abajo a arriba
    ];

    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return board[a] === currentPlayer && board[b] === currentPlayer && board[c] === currentPlayer;
    });
}

// Función para reiniciar el juego
function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    cells.forEach(cell => cell.textContent = '');
    message.textContent = '';
}

// Función para terminar el juego y volver al menú
function endGame() {
    gameOptions.style.display = 'block';
    gameControls.style.display = 'none';
    boardDiv.style.display = 'none';
    message.textContent = '';
}

// Agregar eventos a las celdas
cells.forEach(cell => cell.addEventListener('click', handleClick));

// Agregar evento al botón de reinicio
resetButton.addEventListener('click', resetGame);

// Agregar evento para volver al menú principal
backToMenuButton.addEventListener('click', endGame);

// Agregar evento para terminar el juego
endGameButton.addEventListener('click', endGame);
