const turnO = "O";
const turnX = "X";
const winningCombination = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const board = document.querySelector(".board");
const cells = document.querySelectorAll(".cell");
let isTurnX = true;
const win = document.querySelector(".win");
const winText = document.querySelector(".win-text");
const restartBtn = document.querySelector(".restart");

restartBtn.addEventListener("click", () => {
  startGame();
});

function startGame() {
  isTurnX = true;
  cells.forEach((cell) => {
    cell.innerHTML = "";
    win.classList.remove("show");
    cell.removeEventListener("click", cellClick);
    cell.addEventListener("click", cellClick, { once: true });
  });
}

function cellClick(event) {
  const curCell = event.target;
  const curClass = isTurnX ? turnX : turnO;
  placeMark(curCell, curClass);
  if (checkWin(curClass)) {
    endGame(false);
    cells.forEach((cell) => cell.removeEventListener("click", cellClick));
  } else if (isDraw()) {
    endGame(true);
    cells.forEach((cell) => cell.removeEventListener("click", cellClick));
  } else {
    swapTurn();
  }
}

function placeMark(cell, curClass) {
  cell.innerHTML = curClass;
}

function swapTurn() {
  isTurnX = !isTurnX;
}

function endGame(draw) {
  if (draw) {
    winText.innerHTML = "It's a draw!";
  } else {
    winText.innerHTML = `Player ${isTurnX ? "X" : "O"} win\'s!`;
  }
  win.classList.add("show");
}

function isDraw() {
  return [...cells].every((cell) => {
    return cell.innerHTML;
  });
}

function checkWin(curClass) {
  return winningCombination.some((combination) => {
    return combination.every((cell) => {
      return cells[cell].innerHTML === curClass;
    });
  });
}

startGame();
