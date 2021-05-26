/* eslint-disable no-plusplus */
const spaces = [];
let turn = 1;
let AI = false;

// test to check for tie game

function checkForTie(spaces) {
  if (spaces.some((e) => e.selection === 'I')) {
    return false;
  } else {
    if (checkOWins(spaces, playerO)) {
      oWins(playerO)
    } else if (checkXWins(spaces, playerX)) {
      xWins(playerX)
    } else {
      return true;
    };
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
  if (turn % 2 === 1) {
    player = playerX;
  } else {
    player = playerO;
  }
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

  } else if (turn%2 === 0) {
    choice = player.marker;
    playerXTurn();
    turn++;
  } else {
    choice = player.marker;
    playerOTurn();
    turn++;
  }
  thisCell.innerText = choice;
  thisCell.style.color = 'black';
  const select = { selection: choice };
  // const spaceArray = { ...select };
  spaces.splice(targetID, 1, select);
  setTimeout(checkWin(spaces, playerX, playerO), 1000);
  if ((turn%2 === 0) && AI) {
    AIFactory();
  }
}



// TODO: fix 'maximum call stack size exceeded'

function selectWinningSpace(newSpaces) {
  const winningOptions = [];
  for (let i = 0; i < 9; i++) {
    let tempSpaces = [];
    const select = { selection: 'O' };
    let ref = newSpaces;
    tempSpaces = ref.slice();
    tempSpaces.splice(i, 1, select);
    if (checkOWins(tempSpaces)) {
      winningOptions.push(i);
    }
  }
  return winningOptions;
}

function selectLosingSpace(newSpaces) {
  const losingOptions = [];
  for (let i = 0; i < 9; i++) {
    let tempSpaces = [];
    const select = { selection: 'X' };
    let ref = newSpaces;
    tempSpaces = ref.slice();
    tempSpaces.splice(i, 1, select);
    if (checkXWins(tempSpaces)) {
      losingOptions.push(i);
    }
  }
  return losingOptions;
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

function checkValidity(targetID) {
  console.log(spaces[targetID].selection);
  if (spaces[targetID].selection === 'I') {
    return true;
  } else {
    return false;
  }
}

function validSelections(options) {
  for (let i = 0; i < options.length; i++) {
    let targetID = options[i];
    if (checkValidity(targetID) === false){
      options.splice(i, 1);
    }
  }
  return options;
}

function tryRandomOption() {
  let options = [];
  for (let i = 0; i < 9; i++) {
    if (spaces[i].selection === 'I') {
      options.push(i);
    }
  }
  console.log(options);

  let randomOption = Math.floor(Math.random() * options.length);
  return options[randomOption];
}

function tryBlockLose(blockLose) {
  let targetID;
  if (blockLose.length > 0) {
    let losingOptions = validSelections(blockLose);
    let option = Math.floor(Math.random() * blockLose.length);
    targetID = losingOptions[option];
    if (typeof targetID !== 'number') {
      targetID = tryRandomOption();
    }
  } else {
    targetID = tryRandomOption();
  }
  return targetID;
}

// TODO: if winning space is already selected, then choose next winning space, then choose losing space

const AIFactory = () => {
  let targetID = '';
  const newSpaces = spaces;
  let selectWin = selectWinningSpace(newSpaces);
  let blockLose = selectLosingSpace(newSpaces);

  if (turn === 2) {
    let firstMove = firstAIMove();
    targetID = firstMove;
  } else if (selectWin.length > 0) {
      let winningOptions = validSelections(selectWin);
      let option = Math.floor(Math.random() * selectWin.length);
      targetID = winningOptions[option];
      if (typeof targetID !== 'number') {
        targetID = tryBlockLose(blockLose);
      }
  } else {
    targetID = tryBlockLose(blockLose);
  }
  
    let thisCell = document.getElementById(targetID);
    player = createUser('Marvin', 'O');
    console.log(targetID);
    placeMarker(targetID, thisCell, player);
};

function checkOWins(spaces) {
  if (
    ((spaces[0].selection === 'O') && (spaces[1].selection === 'O') && (spaces[2].selection === 'O')) ||
    ((spaces[3].selection === 'O') && (spaces[4].selection === 'O') && (spaces[5].selection === 'O')) ||
    ((spaces[6].selection === 'O') && (spaces[7].selection === 'O') && (spaces[8].selection === 'O')) ||
    ((spaces[0].selection === 'O') && (spaces[3].selection === 'O') && (spaces[6].selection === 'O')) ||
    ((spaces[1].selection === 'O') && (spaces[4].selection === 'O') && (spaces[7].selection === 'O')) ||
    ((spaces[2].selection === 'O') && (spaces[5].selection === 'O') && (spaces[8].selection === 'O')) ||
    ((spaces[0].selection === 'O') && (spaces[4].selection === 'O') && (spaces[8].selection === 'O')) ||
    ((spaces[6].selection === 'O') && (spaces[4].selection === 'O') && (spaces[2].selection === 'O'))
  ) {
      return true;
    } else {
      return false;
    };
};

function checkXWins(spaces) {
  if (
    ((spaces[0].selection === 'X') && (spaces[1].selection === 'X') && (spaces[2].selection === 'X')) ||
    ((spaces[3].selection === 'X') && (spaces[4].selection === 'X') && (spaces[5].selection === 'X')) ||
    ((spaces[6].selection === 'X') && (spaces[7].selection === 'X') && (spaces[8].selection === 'X')) ||
    ((spaces[0].selection === 'X') && (spaces[3].selection === 'X') && (spaces[6].selection === 'X')) ||
    ((spaces[1].selection === 'X') && (spaces[4].selection === 'X') && (spaces[7].selection === 'X')) ||
    ((spaces[2].selection === 'X') && (spaces[5].selection === 'X') && (spaces[8].selection === 'X')) ||
    ((spaces[0].selection === 'X') && (spaces[4].selection === 'X') && (spaces[8].selection === 'X')) ||
    ((spaces[6].selection === 'X') && (spaces[4].selection === 'X') && (spaces[2].selection === 'X'))
  ) {
      return true;
    } else {
      return false;
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
  turn = 1;
  AI = false;
}

function addComputer() {
  resetGame();
  document.getElementById('playerO').value = 'Marvin';
  AI = true;
  turn = 1;
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