let spaces = [];

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
            cell.addEventListener("click", selectSquare);
            cell.innerText = choice;
            cell.style.color = "white";
            let playerChoice = {[spaceNumber]: [choice]};
            let spaceArray = Object.assign({}, playerChoice);
            spaces.push(spaceArray);
            container.appendChild(cell).className = "grid";
            row.appendChild(cell); 
        }
        content.appendChild(row);
    };
    console.log(spaces);
    return spaces;
}) ();

function selectSquare(e) {
    console.log("click");
    let thisCell = e.target;
    let targetID = e.target.getAttribute("ID");
    console.log(targetID);
    let choice = "X";
    thisCell.innerText = choice;
    thisCell.style.color = "black";
    let playerChoice = {[targetID]: [choice]};
    let spaceArray = Object.assign({}, playerChoice);
    spaces.splice(targetID, 1, spaceArray);
    console.log(spaces);

}

const displayController = (function() {
    console.log("displayController");
}) ();

const createUser = ({userName, avatar}) => ({
    userName,
    avatar
});

console.log ("user" + createUser.username);
