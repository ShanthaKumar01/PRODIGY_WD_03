document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('gameBoard');
    const statusDisplay = document.getElementById('statusDisplay');
    const restartButton = document.querySelector('.restart');
    
    let gameActive = true;
    let currentPlayer = 'X';
    let gameState = ['', '', '', '', '', '', '', '', ''];

    function createCell(index) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.addEventListener('click', () => handleCellClick(index));
        return cell;
    }

    function renderBoard() {
        gameBoard.innerHTML = '';
        for (let i = 0; i < 9; i++) {
            const cell = createCell(i);
            cell.textContent = gameState[i];
            gameBoard.appendChild(cell);
        }
    }

    function handleCellClick(index) {
        if (!gameActive || gameState[index] !== '') {
            return;
        }

        gameState[index] = currentPlayer;
        renderBoard();
        checkGameResult();
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        updateStatusDisplay();
    }

    function checkGameResult() {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
                gameActive = false;
                statusDisplay.textContent = `Player ${gameState[a]} wins!`;
                return;
            }
        }

        if (!gameState.includes('')) {
            gameActive = false;
            statusDisplay.textContent = 'It\'s a draw!';
        }
    }

    function updateStatusDisplay() {
        statusDisplay.textContent = `Current player: ${currentPlayer}`;
    }

    function restartGame() {
        gameActive = true;
        currentPlayer = 'X';
        gameState = ['', '', '', '', '', '', '', '', ''];
        renderBoard();
        updateStatusDisplay();
    }

    // Initial setup
    renderBoard();
    updateStatusDisplay();
    restartButton.addEventListener('click', restartGame);
});
