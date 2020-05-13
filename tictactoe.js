
const gameBoard = (function() {
    let spaces = [];
    const container = document.getElementById("container");
    for (i = 0; i<=2; i++) {
        for (j = 1; j<=3; j++) {
            let cell = document.createElement("div");
            cell.innerText = ((i*3)+j);
            spaces.push((i*3)+j);
            container.appendChild(cell).className = "grid";
        }
    };
    console.log (spaces);
}) ();

const displayController = (function() {
    console.log("displayController")
    }) ();

const createUser = ({userName, avatar}) => ({
    userName,
    avatar
});

