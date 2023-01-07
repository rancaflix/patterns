let firstPlayerBoard = null;
let secondPlayerBoard = null;

function generatePattern() {
  // Generates a 5x5 board with a random pattern of black and white tiles
  const board = [];
  for (let i = 0; i < 5; i++) {
    const row = [];
    for (let j = 0; j < 5; j++) {
      row.push(Math.random() < 0.5 ? 'black' : 'white');
    }
    board.push(row);
  }
  return board;
}

// The updateTable function takes a board and a tableId as input, and updates the HTML table with the given id with the given board.
// It does this by first clearing the inner HTML of the table, then creating a new row for each row in the board, and a new cell for each cell in the row.
// It sets the background color of each cell to the color of the cell in the board.
function updateTable(board, tableId) {
  const table = document.getElementById(tableId);
  let newHTML = '';
  for (const row of board) {
    let newRow = '<tr>';
    for (const cell of row) {
      newRow += `<td style="background-color: ${cell}"></td>`;
    }
    newRow += '</tr>';
    newHTML += newRow;
  }
  table.innerHTML = newHTML;
}
  
// The calculateDifference function takes two boards as input, and returns the number of cells that are different between the two boards.
// It does this by iterating over each cell in the boards and incrementing the difference counter if the cells are different.
function calculateDifference(board1, board2) {
  let difference = 0;
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      if (board1[i][j] !== board2[i][j]) {
        difference++;
      }
    }
  }
  return difference;
}

function calculateStartingPosition() {
  // Calculates a starting position that is fair to both players
  // If the difference between the two patterns is greater than 2, it chooses a random color for each cell
  // Otherwise, it randomly chooses between the two colors for each cell
  const startingPosition = [];
  // Flip the second player's pattern upside down
  const flippedSecondPlayerBoard = secondPlayerBoard.slice().reverse();
  for (let i = 0; i < 5; i++) {
    const row = [];
    for (let j = 0; j < 5; j++) {
      if (calculateDifference(firstPlayerBoard, flippedSecondPlayerBoard) > 2) {
        row.push(firstPlayerBoard[i][j] === flippedSecondPlayerBoard[i][j] ? firstPlayerBoard[i][j] : (Math.random() < 0.5 ? firstPlayerBoard[i][j] : flippedSecondPlayerBoard[i][j]));
      }
      }
      startingPosition.push(row);
    }
    return startingPosition;
  }

const saveButton = document.getElementById('save-button');
saveButton.addEventListener('click', () => {
    // Saves the board in the first player's board and updates the text of the button
    const board = document.getElementById('first-player-board');
    firstPlayerBoard = Array.from(board.rows, row => Array.from(row.cells, cell => cell.style.backgroundColor));
    board.setAttribute('data-hidden', 'true');
    saveButton.textContent = 'Show Pattern';
  });
  
const secondPlayerSaveButton = document.getElementById('second-player-save-button');
secondPlayerSaveButton.addEventListener('click', () => {
  // Saves the pattern in the second player's board and hides it
  const board = document.getElementById('second-player-board');
  secondPlayerBoard = Array.from(board.rows, row => Array.from(row.cells, cell => cell.style.backgroundColor));
  board.setAttribute('data-hidden', 'true');
    saveButton.textContent = 'Show Pattern';
  });

const newGameButton = document.getElementById('new-game-button');
newGameButton.addEventListener('click', () => {
  // Resets the boards and hides them
  firstPlayerBoard = null;
  secondPlayerBoard = null;
  updateTable(generatePattern(), 'first-player-board');
  updateTable(generatePattern(), 'second-player-board');
  document.getElementById('first-player-board').setAttribute('data-hidden', 'true');
  document.getElementById('second-player-board').setAttribute('data-hidden', 'true');
  saveButton.innerText = 'Save and hide';
  secondPlayerSaveButton.innerText = 'Save and hide';
});

const calculateButton = document.getElementById('calculate-button');
calculateButton.addEventListener('click', () => {
  // Calculates the starting position and displays it
  const startingPosition = calculateStartingPosition();
  updateTable(startingPosition, 'starting-position-board');
});
