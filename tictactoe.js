/* eslint-disable no-plusplus */
const spaces = [];
let turn = true;
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
  if (turn === true) {
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
  } else if (turn === true) {
    choice = player.marker;
    playerOTurn();
    turn = false;
  } else {
    choice = player.marker;
    playerXTurn();
    turn = true;
  }
  thisCell.innerText = choice;
  thisCell.style.color = 'black';
  const select = { selection: choice };
  const spaceArray = { ...select };
  console.log(targetID);
  console.log(spaceArray);
  spaces.splice(targetID, 1, spaceArray);
  setTimeout(checkWin(spaces, playerX, playerO), 1000);
  if ((turn === false) && AI) {
    AIFactory();
  }
}

function checkValidity(targetID) {
  if (spaces[targetID].selection === 'I') {
    return targetID;
  } else {
    AIFactory();
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
  return checkValidity(targetID);
}

const AIFactory = () => {
  let targetID;
  if (spaces[4].selection === 'I') {
    targetID = 4;
  } else if (
    spaces[0].selection === 'I' || 
    spaces[2].selection === 'I' ||
    spaces[6].selection === 'I'||
    spaces[8].selection === 'I') {
    targetID = selectCorner();
  } else {
    let sideSelection = Math.floor(Math.random() * 9);
    targetID = checkValidity(sideSelection);
  }

  let thisCell = document.getElementById(targetID);
  player = createUser('Marvin', 'O');
  placeMarker(targetID, thisCell, player);
};

function checkWin(spaces, playerX, playerO) {
  if (
    (spaces[0].selection === 'O')
    & (spaces[1].selection === 'O')
    & (spaces[2].selection === 'O')
  ) {
    oWins(playerO);
  } else if (
    (spaces[3].selection === 'O')
    & (spaces[4].selection === 'O')
    & (spaces[5].selection === 'O')
  ) {
    oWins(playerO);
  } else if (
    (spaces[6].selection === 'O')
    & (spaces[7].selection === 'O')
    & (spaces[8].selection === 'O')
  ) {
    oWins(playerO);
  } else if (
    (spaces[0].selection === 'O')
    & (spaces[3].selection === 'O')
    & (spaces[6].selection === 'O')
  ) {
    oWins(playerO);
  } else if (
    (spaces[1].selection === 'O')
    & (spaces[4].selection === 'O')
    & (spaces[7].selection == 'O')
  ) {
    oWins(playerO);
  } else if (
    (spaces[2].selection === 'O')
    & (spaces[5].selection === 'O')
    & (spaces[8].selection === 'O')
  ) {
    oWins(playerO);
  } else if (
    (spaces[0].selection === 'O')
    & (spaces[4].selection === 'O')
    & (spaces[8].selection === 'O')
  ) {
    oWins(playerO);
  } else if (
    (spaces[6].selection === 'O')
    & (spaces[4].selection === 'O')
    & (spaces[2].selection === 'O')
  ) {
    oWins(playerO);
  } else if (
    (spaces[0].selection === 'X')
    & (spaces[1].selection === 'X')
    & (spaces[2].selection === 'X')
  ) {
    xWins(playerX);
  } else if (
    (spaces[3].selection === 'X')
    & (spaces[4].selection === 'X')
    & (spaces[5].selection === 'X')
  ) {
    xWins(playerX);
  } else if (
    (spaces[6].selection === 'X')
    & (spaces[7].selection === 'X')
    & (spaces[8].selection === 'X')
  ) {
    xWins(playerX);
  } else if (
    (spaces[0].selection === 'X')
    & (spaces[3].selection === 'X')
    & (spaces[6].selection === 'X')
  ) {
    xWins(playerX);
  } else if (
    (spaces[1].selection === 'X')
    & (spaces[4].selection === 'X')
    & (spaces[7].selection === 'X')
  ) {
    xWins(playerX);
  } else if (
    (spaces[2].selection === 'X')
    & (spaces[5].selection === 'X')
    & (spaces[8].selection === 'X')
  ) {
    xWins(playerX);
  } else if (
    (spaces[0].selection === 'X')
    & (spaces[4].selection === 'X')
    & (spaces[8].selection === 'X')
  ) {
    xWins(playerX);
  } else if (
    (spaces[6].selection === 'X')
    & (spaces[4].selection === 'X')
    & (spaces[2].selection === 'X')
  ) {
    xWins(playerX);
  } else if (
    checkForTie(spaces)
  ) {
    catsGame();
  }
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
  turn = true;
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