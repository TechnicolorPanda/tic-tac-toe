const gameBoard = (function() {
    let spaces = [];
    const container = document.getElementById("container");
    const content = document.createElement("div");
    content.classList.add("box");
    container.appendChild(content);
    for (i = 0; i<=2; i++) {
        var row = document.createElement("div"); 
        row.className = "row"; 
        for (j = 1; j<=3; j++) {
            const cell = document.createElement("div");
            cell.className = "gridsquare"; 
            let spaceNumber = ((i*3)+j);
            let choice = " ";
            cell.addEventListener("click", selectSquare);
            console.log("returned choice = " + choice);
            cell.innerText = choice;
            let playerChoice = {[spaceNumber]: [choice]};
            let spaceArray = Object.assign({}, playerChoice);
            spaces.push(spaceArray);
            container.appendChild(cell).className = "grid";
            row.appendChild(cell); 
        }
        content.appendChild(row);
    };
    console.log(spaces);
}) ();

function selectSquare(e) {
    console.log("click");
    //const thisCell = e.target;
    let choice = "X";
    console.log(choice);
    return choice;
}

const displayController = (function() {
    
    }) ();

const createUser = ({userName, avatar}) => ({
    userName,
    avatar
});

