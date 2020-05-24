let spaces = [];
let turn = 0;

const gameBoard = (function() {
    const container = document.getElementById("container");
    const content = document.createElement("div");
    content.classList.add("box");
    container.appendChild(content);
    fillBoard(container, content);
    const reset = document.getElementById("reset");
    reset.addEventListener("click", resetGame);
    return spaces;
}) ();

function fillBoard(container, content) {
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
}

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
    console.log(spaces);
    checkWin(spaces);
}

function checkWin(spaces) {
    if (spaces[0].selection == "O" & spaces[1].selection == "O" & spaces[2].selection == "O") {
        alert(playerO.userName + " Wins!");
    } else if (spaces[3].selection == "O" & spaces[4].selection == "O" & spaces[5].selection == "O") {
        alert(playerO.userName + " Wins!");
    } else if (spaces[6].selection == "O" & spaces[7].selection == "O" & spaces[8].selection == "O") {
        alert(playerO.userName + " Wins!");
    } else if (spaces[0].selection == "O" & spaces[3].selection == "O" & spaces[6].selection == "O") {
        alert(playerO.userName + " Wins!");
    } else if (spaces[1].selection == "O" & spaces[4].selection == "O" & spaces[7].selection == "O") {
        alert(playerO.userName + " Wins!");
    } else if (spaces[2].selection == "O" & spaces[5].selection == "O" & spaces[8].selection == "O") {
        alert(playerO.userName + " Wins!");
    } else if (spaces[0].selection == "O" & spaces[4].selection == "O" & spaces[8].selection == "O") {
        alert(playerO.userName + " Wins!");
    } else if (spaces[6].selection == "O" & spaces[4].selection == "O" & spaces[2].selection == "O") {
        alert(playerO.userName + " Wins!");
    } else if (spaces[0].selection == "X" & spaces[1].selection == "X" & spaces[2].selection == "X") {
        alert(playerX.userName + " Wins!");
    } else if (spaces[3].selection == "X" & spaces[4].selection == "X" & spaces[5].selection == "X") {
        alert(playerX.userName + " Wins!");
    } else if (spaces[6].selection == "X" & spaces[7].selection == "X" & spaces[8].selection == "X") {
        alert(playerX.userName + " Wins!");
    } else if (spaces[0].selection == "X" & spaces[3].selection == "X" & spaces[6].selection == "X") {
        alert(playerX.userName + " Wins!");
    } else if (spaces[1].selection == "X" & spaces[4].selection == "X" & spaces[7].selection == "X") {
        alert(playerX.userName + " Wins!");
    } else if (spaces[2].selection == "X" & spaces[5].selection == "X" & spaces[8].selection == "X") {
        alert(playerX.userName + " Wins!");
    } else if (spaces[0].selection == "X" & spaces[4].selection == "X" & spaces[8].selection == "X") {
        alert(playerX.userName + " Wins!");
    } else if (spaces[6].selection == "X" & spaces[4].selection == "X" & spaces[2].selection == "X") {
        alert(playerX.userName + " Wins!");
    }
}

function resetGame() {
    console.log("reset");
    for (let i=0; i<8; i++) {
        cell.id = i;
        let choice = "I";
        let select = {"selection": choice};
        cell.innerText = choice;
        cell.style.color = "white";
        let selectChoice = Object.assign({}, select);
        spaces.push(selectChoice);
    }
    let turn = 0;

}

//const displayController = (function() {
//    console.log(spaces);
//    if (spaces[0].selection === spaces[1].selection === spaces[2].selection){
//        if (spaces[0].selection === "X") {
//            alert(playerX.userName + " Wins!")
//        } else {
//            alert(playerO.userName + " Wins!")  
//        }
//    }
//}) ();

const createUser = (userName, marker) => {
    return  {userName, marker};
};

const playerX = createUser("Player X", "X");

const playerO = createUser("Player O", "O");
