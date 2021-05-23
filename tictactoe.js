/* eslint-disable no-plusplus */
const spaces = [];
let turn = 0;
let AI = false;

// test to check for tie game

function checkForTie(spaces) {
  if (spaces.some((e) => e.selection === 'I')) {
    const tie = false;
    return tie;
  } else {
    const tie = true;
    return tie;
  }
}

// fill game board with placeholder

function fillBoard(board, content) {
  for (let i = 0; i <= 2; i++) {
    const row = document.createElement('div');
    row.className = 'row';

    for (let j = 0; j <= 2; j++) {
      const cell = document.createElement('div');
      cell.className = 'gridsquare';
      const spaceNumber = i * 3 + j;
      cell.id = spaceNumber;
      const choice = 'I';
      const select = { selection: choice };
      cell.addEventListener('click', selectSquare);
      cell.innerText = choice;
      cell.style.color = 'white';
      const selectChoice = { ...select };
      spaces.push(selectChoice);
      board.appendChild(cell).className = 'grid';
      row.appendChild(cell);
    }
    content.appendChild(row);
  }
}

function endGame() {
  for (let i = 0; i < 9; i++) {
    const cell = document.getElementById(i);
    cell.removeEventListener('click', selectSquare);
  }
}

function selectSquare(e) {
  const playerX = createUser('Player X', 'X');
  const playerO = createUser('Player O', 'O');

  const thisCell = e.target;
  const targetID = e.target.getAttribute('ID');
  let player;
  if (turn % 2) {
    player = playerX;
  } else {
    player = playerO;
  }
  console.log('player ' + player.userName);
  placeMarker(targetID, thisCell, player);
}

// changes colors of player labels based on who's turn it is

function playerXTurn() {
  const labelX = document.getElementById('playerXLabel');
  labelX.style.backgroundColor = 'rgb(172, 68, 61)';
  const labelO = document.getElementById('playerOLabel');
  labelO.style.backgroundColor = 'rgb(37, 43, 43)';
}

function playerOTurn() {
  const labelX = document.getElementById('playerXLabel');
  labelX.style.backgroundColor = 'rgb(37, 43, 43)';
  const labelO = document.getElementById('playerOLabel');
  labelO.style.backgroundColor = 'rgb(172, 68, 61)';
}

function placeMarker(targetID, thisCell, player) {
  const messageBox = document.getElementById('message_box');
  messageBox.innerHTML = '';

  if (spaces[parseInt(targetID)].selection !== 'I') {
    messageBox.innerHTML = 'Space already taken. Make new selection.';
  } else if (turn % 1) {
    choice = player.marker;
    playerOTurn();
    turn++;
    console.log('turn = ' + turn);
  } else {
    choice = player.marker;
    playerXTurn();
    turn++;
    console.log('turn = ' + turn);
    console.log(turn%2);
  }
  thisCell.innerText = choice;
  thisCell.style.color = 'black';
  const select = { selection: choice };
  const spaceArray = { ...select };
  console.log(targetID);
  console.log(spaceArray);
  console.log('turn = ' + turn);
  console.log(turn%2);
  spaces.splice(targetID, 1, spaceArray);
  setTimeout(checkWin(spaces, playerX, playerO), 1000);
  if ((turn%2 === 0) && AI) {
    AIFactory();
  }
}

function checkValidity(targetID) {
  console.log(spaces[targetID].selection === 'I');
  for (let i = 0; i < 9; i++) {
    if (spaces[i].selection === 'I') {
      if (spaces[targetID].selection === 'I') {
        return true;
      } else {
        return false;
      }
    } else {

      // TODO: when all spaces are selected, prevent infinite loop
      return true;
    }
  }
}

function selectWinningSpace() {
  for (let i = 0; i < 9; i++) {
    const select = { selection: 'O' };
    const spaceArray = { ...select };
    let newSpaces = spaces;
    newSpaces.splice(i, 1, spaceArray);
    if (checkOWins(newSpaces)) {
      console.log(i);
      return i;
    } else {
      console.log('no option to win');
      return false;
    }
  }
}

function selectLosingSpace() {
  for (let i = 0; i < 9; i++) {
    const select = { selection: 'X' };
    const spaceArray = { ...select };
    let newSpaces = spaces;
    newSpaces.splice(i, 1, spaceArray);
    if (checkXWins(newSpaces)) {
      console.log(i);
      return i;
    } else {
      console.log('no option to lose');
      return false;
    }
  }
}

function firstAIMove() {
  if (spaces[4].selection === 'I') {
    return 4;
  } else if (
    spaces[0].selection === 'I' || 
    spaces[2].selection === 'I' ||
    spaces[6].selection === 'I'||
    spaces[8].selection === 'I') {
    return selectCorner();
  }
}

function selectCorner() {
  const cornerSelection = Math.floor(Math.random() * 4);
  switch (cornerSelection) {
    case 0:
      targetID = 0;
      break;
    case 1:
      targetID = 2;
      break;
    case 2:
      targetID = 6;
      break;
    case 3:
      targetID = 8;
      break;        
  }
  return targetID;
}

const AIFactory = () => {
  let targetID;
  if (turn === 2) {
    let firstMove = firstAIMove();
    targetID = firstMove;
  } else {
    if (
      selectWinningSpace() !== false
      ) {
      console.log('select winning space ' + selectWinningSpace());
      targetID = selectWinningSpace();
    } else if (
      selectLosingSpace() !== false
    ) {
      console.log('select losing space ' + selectLosingSpace());
      targetID = selectLosingSpace();
    } else {
      console.log('random choice');
      targetID = Math.floor(Math.random() * 9);
    }
  }

  if (checkValidity(targetID)) {
    let thisCell = document.getElementById(targetID);
    player = createUser('Marvin', 'O');
    placeMarker(targetID, thisCell, player);
  } else {
    AIFactory();
  }
};

function checkOWins(spaces) {
  if (
    ((spaces[0].selection === 'O') & (spaces[1].selection === 'O') & (spaces[2].selection === 'O')) ||
    ((spaces[3].selection === 'O') & (spaces[4].selection === 'O') & (spaces[5].selection === 'O')) ||
    ((spaces[6].selection === 'O') & (spaces[7].selection === 'O') & (spaces[8].selection === 'O')) ||
    ((spaces[0].selection === 'O') & (spaces[3].selection === 'O') & (spaces[6].selection === 'O')) ||
    ((spaces[1].selection === 'O') & (spaces[4].selection === 'O') & (spaces[7].selection === 'O')) ||
    ((spaces[2].selection === 'O') & (spaces[5].selection === 'O') & (spaces[8].selection === 'O')) ||
    ((spaces[0].selection === 'O') & (spaces[4].selection === 'O') & (spaces[8].selection === 'O')) ||
    ((spaces[6].selection === 'O') & (spaces[4].selection === 'O') & (spaces[2].selection === 'O'))
  ) {
    return true;
    };
};

function checkXWins(spaces) {
  if (
    ((spaces[0].selection === 'X') & (spaces[1].selection === 'X') & (spaces[2].selection === 'X')) ||
    ((spaces[3].selection === 'X') & (spaces[4].selection === 'X') & (spaces[5].selection === 'X')) ||
    ((spaces[6].selection === 'X') & (spaces[7].selection === 'X') & (spaces[8].selection === 'X')) ||
    ((spaces[0].selection === 'X') & (spaces[3].selection === 'X') & (spaces[6].selection === 'X')) ||
    ((spaces[1].selection === 'X') & (spaces[4].selection === 'X') & (spaces[7].selection === 'X')) ||
    ((spaces[2].selection === 'X') & (spaces[5].selection === 'X') & (spaces[8].selection === 'X')) ||
    ((spaces[0].selection === 'X') & (spaces[4].selection === 'X') & (spaces[8].selection === 'X')) ||
    ((spaces[6].selection === 'X') & (spaces[4].selection === 'X') & (spaces[2].selection === 'X'))
  ) {
    return true;
    };
};

function checkWin(spaces, playerX, playerO) {
  if (checkOWins(spaces, playerO)) {oWins(playerO)};
  if (checkXWins(spaces, playerX)) {xWins(playerX)};
  if (checkForTie(spaces)) {catsGame()};
}

const createUser = (userName, marker) => ({ userName, marker });

// displays message when O wins

function oWins() {
  const labelO = document.getElementById('playerO');
  const playerOName = createUser(labelO.value, 'O');
  const messageBox = document.getElementById('message_box');
  messageBox.innerHTML = `${playerOName.userName} Wins!`;
  endGame();
}

// displays message when X wins

function xWins() {
  const labelX = document.getElementById('playerX');
  const playerXName = createUser(labelX.value, 'X');
  const messageBox = document.getElementById('message_box');
  messageBox.innerHTML = `${playerXName.userName} Wins!`;
  endGame();
}

// displays message at tie

function catsGame() {
  const messageBox = document.getElementById('message_box');
  messageBox.innerHTML = 'Cat\'s Game';
  endGame();
}

// returns board to initial state upon reset

function resetGame() {
  const messageBox = document.getElementById('message_box');
  messageBox.innerHTML = ' ';
  const board = document.getElementById('container');
  board.innerHTML = ' ';
  const content = document.createElement('div');
  content.classList.add('box');
  board.appendChild(content);
  spaces.splice(0, spaces.length);

  fillBoard(board, content);
  playerXTurn();

  document.getElementById('playerX').value = 'Player X';
  document.getElementById('playerO').value = 'Player O';
  turn++;
  AI = false;
}

function addComputer() {
  resetGame();
  document.getElementById('playerO').value = 'Marvin';
  AI = true;
  return AI;
}

// creates game board

const gameBoard = (function createBoard() {
  const board = document.getElementById('container');
  const content = document.createElement('div');
  content.classList.add('box');
  board.appendChild(content);
  fillBoard(board, content);
}());

// creates buttons to reset or add AI player

const displayController = (function computerPlayer() {
  playerXTurn();
  const reset = document.getElementById('reset');
  reset.addEventListener('click', resetGame);
  const computerPlay = document.getElementById('computerPlay');
  computerPlay.addEventListener('click', addComputer);
}());