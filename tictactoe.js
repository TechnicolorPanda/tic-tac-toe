let spaces = [];
let turn = 0;
const board = document.getElementById("container");

const gameBoard = (function() {
    const content = document.createElement("div");
    content.classList.add("box");
    board.appendChild(content);

    fillBoard(board, content);
}) ();

const displayController = (function() {
    const reset = document.getElementById("reset");
    reset.addEventListener("click", resetGame);
    const computerPlay = document.getElementById("computerPlay");
    computerPlay.addEventListener("click", addComputer);
}) ();

function fillBoard(board, content) {
    for (i = 0; i<=2; i++) {
        var row = document.createElement("div"); 
        row.className = "row"; 
        for (j = 0; j<=2; j++) {
            const cell = document.createElement("div");
            cell.className = "gridsquare"; 
            let spaceNumber = ((i*3)+j);
            cell.id = spaceNumber;
            let choice = "I";
            let select = {"selection": choice};
            cell.addEventListener("click", selectSquare);
            cell.innerText = choice;
            cell.style.color = "white";
            let selectChoice = Object.assign({}, select);
            spaces.push(selectChoice);
            board.appendChild(cell).className = "grid";
            row.appendChild(cell); 
        }
        content.appendChild(row);
    };
}

function selectSquare(e) {
    let thisCell = e.target;
    let targetID = e.target.getAttribute("ID");

    if (spaces[targetID].selection != "I") {
        alert ("Space already taken. Make new selection.");
    } else {
        if (turn%2 == 0) {
            choice = playerX.marker;
            let labelO = document.getElementById("playerOLabel");
            labelO.style.backgroundColor = "rgb(172, 68, 61)";
            let labelX = document.getElementById("playerXLabel");
            labelX.style.backgroundColor = "rgb(37, 43, 43)";
            turn++;
        } else {
            choice = playerO.marker;
            let labelX = document.getElementById("playerXLabel");
            labelX.style.backgroundColor = "rgb(172, 68, 61)";
            let labelO = document.getElementById("playerOLabel");
            labelO.style.backgroundColor = "rgb(37, 43, 43)";
            turn++;
        }
    }
    console.log("turn = " + turn);
    thisCell.innerText = choice;
    thisCell.style.color = "black";
    let select = {"selection": choice};
    let spaceArray = Object.assign({}, select);
    spaces.splice(targetID, 1, spaceArray);
    console.log(spaces);
    setTimeout(checkWin(spaces), 1000);
}

function checkWin(spaces) {
    if (spaces[0].selection == "O" & spaces[1].selection == "O" & spaces[2].selection == "O") {
        oWins();
    } else if (spaces[3].selection == "O" & spaces[4].selection == "O" & spaces[5].selection == "O") {
        oWins();;
    } else if (spaces[6].selection == "O" & spaces[7].selection == "O" & spaces[8].selection == "O") {
        oWins();;
    } else if (spaces[0].selection == "O" & spaces[3].selection == "O" & spaces[6].selection == "O") {
        oWins();
    } else if (spaces[1].selection == "O" & spaces[4].selection == "O" & spaces[7].selection == "O") {
        oWins();
    } else if (spaces[2].selection == "O" & spaces[5].selection == "O" & spaces[8].selection == "O") {
        oWins();
    } else if (spaces[0].selection == "O" & spaces[4].selection == "O" & spaces[8].selection == "O") {
        oWins();
    } else if (spaces[6].selection == "O" & spaces[4].selection == "O" & spaces[2].selection == "O") {
        oWins();
    } else if (spaces[0].selection == "X" & spaces[1].selection == "X" & spaces[2].selection == "X") {
        xWins();
    } else if (spaces[3].selection == "X" & spaces[4].selection == "X" & spaces[5].selection == "X") {
        xWins();
    } else if (spaces[6].selection == "X" & spaces[7].selection == "X" & spaces[8].selection == "X") {
        xWins();
    } else if (spaces[0].selection == "X" & spaces[3].selection == "X" & spaces[6].selection == "X") {
        xWins();
    } else if (spaces[1].selection == "X" & spaces[4].selection == "X" & spaces[7].selection == "X") {
        xWins();
    } else if (spaces[2].selection == "X" & spaces[5].selection == "X" & spaces[8].selection == "X") {
        xWins();
    } else if (spaces[0].selection == "X" & spaces[4].selection == "X" & spaces[8].selection == "X") {
        xWins();
    } else if (spaces[6].selection == "X" & spaces[4].selection == "X" & spaces[2].selection == "X") {
        xWins();
    }
}

function oWins() {
    alert(playerO.userName + " Wins!");
    resetGame();
}

function xWins() {
    alert(playerX.userName + " Wins!");
    resetGame();
}

function resetGame() {
    console.log("reset");
    board.innerHTML = " ";
    const content = document.createElement("div");
    content.classList.add("box");
    board.appendChild(content);
    spaces.splice(0, spaces.length);

    fillBoard(board, content);
    
    let turn = 0;
    console.log("turn " + turn);
    return turn;
}

function addComputer() {
    console.log("Add computer");
}


const createUser = (userName, marker) => {
    return  {userName, marker};
};

const playerX = createUser("Player X", "X");

const playerO = createUser("Player O", "O");
