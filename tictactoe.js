let spaces = [];
let turn = 0;

const gameBoard = (function() {
    const container = document.getElementById("container");
    const content = document.createElement("div");
    content.classList.add("box");
    container.appendChild(content);
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
            container.appendChild(cell).className = "grid";
            row.appendChild(cell); 
        }
        content.appendChild(row);
    };
    return spaces;
}) ();

function selectSquare(e) {
    let thisCell = e.target;
    let targetID = e.target.getAttribute("ID");

    if (spaces[targetID].selection != "I") {
        alert ("Space already taken. Make new selection.");
    } else {
        if (turn%2 == 1) {
            choice = playerX.marker;
            turn++;
        } else {
            choice = playerO.marker;
            turn++;
        }
    }
    thisCell.innerText = choice;
    thisCell.style.color = "black";
    let select = {"selection": choice};
    let spaceArray = Object.assign({}, select);
    spaces.splice(targetID, 1, spaceArray);
    //checkWin();
}

function checkWin() {
    console.log ("Check win = " + spaces[0].selection + spaces[1].selection + spaces[2].selection);
    if (spaces[0].selection = spaces[1].selection = spaces[2].selection){
        if (spaces[0].selection == "X") {
            alert(playerX.userName + " Wins!")
        } else {
            alert(playerO.userName + " Wins!")  
        }
    }
}

const displayController = (function() {
    console.log(spaces);
    if (spaces[0].selection === spaces[1].selection === spaces[2].selection){
        if (spaces[0].selection === "X") {
            alert(playerX.userName + " Wins!")
        } else {
            alert(playerO.userName + " Wins!")  
        }
    }
}) ();

const createUser = (userName, marker) => {
    return  {userName, marker};
};

const playerX = createUser("Player X", "X");

const playerO = createUser("Player O", "O");


