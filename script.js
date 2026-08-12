'''// DOM Elements
const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('status');
const statusText = statusDisplay.querySelector('.status-text');
const statusIcon = statusDisplay.querySelector('.status-icon');
const resetBtn = document.getElementById('reset-btn');
const resetScoreBtn = document.getElementById('reset-score-btn');
const victoryModal = document.getElementById('victory-modal');
const modalIcon = document.getElementById('modal-icon');
const modalTitle = document.getElementById('modal-title');
const playAgainBtn = document.getElementById('play-again-btn');
const board = document.getElementById('board');
const particlesContainer = document.getElementById('particles');
const scoreXElement = document.getElementById('score-x');
const scoreOElement = document.getElementById('score-o');
const scoreDrawElement = document.getElementById('score-draw');
const winningLine = document.getElementById('winning-line');

// Game State
let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];
let scores = { x: 0, o: 0, draw: 0 };

// Winning Combinations
const winningConditions = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Diagonal
    [2, 4, 6]  // Diagonal
];

// Initialize game
function initGame() {
    updateStatus();
    setupEventListeners();
}

// Setup event listeners
function setupEventListeners() {
    cells.forEach((cell, index) => {
        cell.addEventListener('click', () => handleCellClick(cell, index));
        cell.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleCellClick(cell, index);
            }
        });
    });
    
    resetBtn.addEventListener('click', resetGame);
    resetScoreBtn.addEventListener('click', resetScores);
    playAgainBtn.addEventListener('click', () => {
        victoryModal.classList.add('hidden');
        resetGame();
    });
}

// Handle cell click
function handleCellClick(cell, index) {
    if (gameState[index] !== '' || !gameActive) return;
    
    // Update game state
    gameState[index] = currentPlayer;
    
    // Update UI
    cell.classList.add(currentPlayer.toLowerCase());
    cell.querySelector('.cell-content').textContent = currentPlayer;
    
    // Create particles effect
    createParticles(cell);
    
    // Check result
    handleResult();
}

// Create particles effect
function createParticles(cell) {
    const rect = cell.getBoundingClientRect();
    const boardRect = board.getBoundingClientRect();
    const centerX = rect.left - boardRect.left + rect.width / 2;
    const centerY = rect.top - boardRect.top + rect.height / 2;
    
    const colors = currentPlayer === 'X' 
        ? ['#00d4ff', '#00b4d8', '#0096c7']
        : ['#ff6b6b', '#ee5a5a', '#e04848'];
    
    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${centerX}px`;
        particle.style.top = `${centerY}px`;
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        particle.style.setProperty('--tx', `${(Math.random() - 0.5) * 100}px`);
        particle.style.setProperty('--ty', `${(Math.random() - 0.5) * 100}px`);
        particlesContainer.appendChild(particle);
        
        setTimeout(() => particle.remove(), 1000);
    }
}

// Handle result validation
function handleResult() {
    let roundWon = false;
    let winningCombo = [];
    
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            roundWon = true;
            winningCombo = [a, b, c];
            break;
        }
    }
    
    if (roundWon) {
        handleWin(winningCombo);
        return;
    }
    
    if (!gameState.includes('')) {
        handleDraw();
        return;
    }
    
    // Switch player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateStatus();
}

// Handle win
function handleWin(combo) {
    gameActive = false;
    scores[currentPlayer.toLowerCase()]++;
    updateScores();
    
    // Highlight winning cells
    combo.forEach(index => cells[index].classList.add('winning'));
    
    // Draw winning line
    drawWinningLine(combo);
    
    // Show victory modal after delay
    setTimeout(() => {
        showVictoryModal(currentPlayer);
    }, 800);
}

// Draw winning line
function drawWinningLine(combo) {
    const cell1 = cells[combo[0]];
    const cell3 = cells[combo[2]];
    const boardRect = board.getBoundingClientRect();
    const rect1 = cell1.getBoundingClientRect();
    const rect3 = cell3.getBoundingClientRect();
    
    const x1 = rect1.left - boardRect.left + rect1.width / 2;
    const y1 = rect1.top - boardRect.top + rect1.height / 2;
    const x2 = rect3.left - boardRect.left + rect3.width / 2;
    const y2 = rect3.top - boardRect.top + rect3.height / 2;
    
    const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
    
    winningLine.style.width = `${length}px`;
    winningLine.style.height = '6px';
    winningLine.style.left = `${x1}px`;
    winningLine.style.top = `${y1 - 3}px`;
    winningLine.style.transformOrigin = '0 50%';
    winningLine.style.transform = `rotate(${angle}deg)`;
    winningLine.classList.remove('hidden');
    
    // Color based on winner
    winningLine.style.background = currentPlayer === 'X'
        ? 'linear-gradient(90deg, #00d4ff, #00b4d8)'
        : 'linear-gradient(90deg, #ff6b6b, #ee5a5a)';
}

// Handle draw
function handleDraw() {
    gameActive = false;
    scores.draw++;
    updateScores();
    showVictoryModal(null);
}

// Show victory modal
function showVictoryModal(winner) {
    if (winner) {
        modalIcon.textContent = '🎉';
        modalTitle.textContent = `Player ${winner} Wins!`;
        modalTitle.style.background = winner === 'X'
            ? 'linear-gradient(135deg, #00d4ff, #00b4d8)'
            : 'linear-gradient(135deg, #ff6b6b, #ee5a5a)';
        modalTitle.style.webkitBackgroundClip = 'text';
        modalTitle.style.webkitTextFillColor = 'transparent';
        modalTitle.style.backgroundClip = 'text';
    } else {
        modalIcon.textContent = '🤝';
        modalTitle.textContent = "It's a Draw!";
        modalTitle.style.background = 'linear-gradient(135deg, #ffd700, #ffaa00)';
        modalTitle.style.webkitBackgroundClip = 'text';
        modalTitle.style.webkitTextFillColor = 'transparent';
        modalTitle.style.backgroundClip = 'text';
    }
    victoryModal.classList.remove('hidden');
}

// Update status display
function updateStatus() {
    const isXTurn = currentPlayer === 'X';
    statusDisplay.className = `status ${isXTurn ? 'player-x-turn' : 'player-o-turn'}`;
    statusIcon.textContent = isXTurn ? '❌' : '⭕';
    statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

// Update scores display
function updateScores() {
    scoreXElement.textContent = scores.x;
    scoreOElement.textContent = scores.o;
    scoreDrawElement.textContent = scores.draw;
    
    // Animate score change
    const animateElement = (element, newValue) => {
        element.style.transform = 'scale(1.3)';
        element.style.color = 'var(--player-x-color)';
        setTimeout(() => {
            element.style.transform = 'scale(1)';
            element.style.color = 'var(--text-primary)';
        }, 300);
    };
    
    animateElement(scoreXElement, scores.x);
    animateElement(scoreOElement, scores.o);
    animateElement(scoreDrawElement, scores.draw);
}

// Reset game
function resetGame() {
    gameActive = true;
    currentPlayer = 'X';
    gameState = ['', '', '', '', '', '', '', '', ''];
    
    // Clear cells
    cells.forEach(cell => {
        cell.classList.remove('x', 'o', 'winning');
        cell.querySelector('.cell-content').textContent = '';
    });
    
    // Hide winning line
    winningLine.classList.add('hidden');
    
    // Hide modal
    victoryModal.classList.add('hidden');
    
    // Update status
    updateStatus();
}

// Reset scores
function resetScores() {
    scores = { x: 0, o: 0, draw: 0 };
    scoreXElement.textContent = '0';
    scoreOElement.textContent = '0';
    scoreDrawElement.textContent = '0';
    resetGame();
}

// Initialize
initGame();'''
