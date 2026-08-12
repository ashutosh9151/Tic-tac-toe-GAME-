(() => {
  "use strict";

  const WIN_COMBOS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  // DOM
  const boardEl = document.getElementById("board");
  const cells = Array.from(document.querySelectorAll(".cell"));
  const statusEl = document.getElementById("status");
  const scoreXEl = document.getElementById("score-x");
  const scoreOEl = document.getElementById("score-o");
  const scoreDrawEl = document.getElementById("score-draw");
  const resetBtn = document.getElementById("reset-btn");
  const resetScoresBtn = document.getElementById("reset-scores-btn");
  const modal = document.getElementById("modal");
  const modalIcon = document.getElementById("modal-icon");
  const modalTitle = document.getElementById("modal-title");
  const modalMessage = document.getElementById("modal-message");
  const modalClose = document.getElementById("modal-close");

  // State
  let board = Array(9).fill(null);
  let currentPlayer = "X";
  let gameActive = true;
  let scores = { X: 0, O: 0, draws: 0 };

  // Load scores from localStorage
  function loadScores() {
    try {
      const saved = localStorage.getItem("ttt-scores");
      if (saved) {
        scores = JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    updateScoreDisplay();
  }

  function saveScores() {
    try {
      localStorage.setItem("ttt-scores", JSON.stringify(scores));
    } catch {
      // ignore
    }
  }

  function updateScoreDisplay() {
    scoreXEl.textContent = scores.X;
    scoreOEl.textContent = scores.O;
    scoreDrawEl.textContent = scores.draws;
  }

  function updateStatus(message, className = "") {
    statusEl.textContent = message;
    statusEl.className = "status" + (className ? ` ${className}` : "");
  }

  function setTurnStatus() {
    const cls = currentPlayer === "X" ? "x-turn" : "o-turn";
    updateStatus(`Player ${currentPlayer}'s turn`, cls);
  }

  function handleCellClick(e) {
    const cell = e.currentTarget;
    const index = Number(cell.dataset.index);

    if (!gameActive || board[index] !== null) return;

    // Place mark
    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());
    cell.disabled = true;

    // Check result
    const result = checkWinner();

    if (result) {
      endGame(result);
      return;
    }

    // Switch player
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    setTurnStatus();
  }

  function checkWinner() {
    for (const combo of WIN_COMBOS) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return { winner: board[a], combo };
      }
    }

    if (board.every((cell) => cell !== null)) {
      return { winner: null, combo: null }; // draw
    }

    return null; // ongoing
  }

  function endGame(result) {
    gameActive = false;
    cells.forEach((c) => (c.disabled = true));

    if (result.winner) {
      // Highlight winning cells
      result.combo.forEach((i) => cells[i].classList.add("winning"));
      scores[result.winner]++;
      updateStatus(`Player ${result.winner} wins!`, "win");
      showModal(
        "🎉",
        "Winner!",
        `Player ${result.winner} wins the game`
      );
    } else {
      scores.draws++;
      updateStatus("It's a draw!", "draw");
      showModal("🤝", "Draw!", "The game ended in a draw");
    }

    updateScoreDisplay();
    saveScores();
  }

  function showModal(icon, title, message) {
    modalIcon.textContent = icon;
    modalTitle.textContent = title;
    modalMessage.textContent = message;
    modal.classList.remove("hidden");
  }

  function hideModal() {
    modal.classList.add("hidden");
  }

  function resetBoard() {
    board = Array(9).fill(null);
    currentPlayer = "X";
    gameActive = true;

    cells.forEach((cell) => {
      cell.textContent = "";
      cell.className = "cell";
      cell.disabled = false;
    });

    hideModal();
    setTurnStatus();
  }

  function resetScores() {
    scores = { X: 0, O: 0, draws: 0 };
    updateScoreDisplay();
    saveScores();
  }

  // Event listeners
  cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
  resetBtn.addEventListener("click", resetBoard);
  resetScoresBtn.addEventListener("click", () => {
    resetScores();
    resetBoard();
  });
  modalClose.addEventListener("click", resetBoard);

  // Close modal on backdrop click
  modal.addEventListener("click", (e) => {
    if (e.target === modal) resetBoard();
  });

  // Keyboard: Escape closes modal / starts new game
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
      resetBoard();
    }
  });

  // Init
  loadScores();
  setTurnStatus();
})();
