var currentPlayer = 1;
var nextPlayer = 2;

let board = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0]
]

// If we search past the edge we'll get a null pointer error
const edgeX = board[0].length - 3;
const edgeY = board.length - 3;

function setMessage(msg){
    var msgEl = document.getElementById("message"); 
    msgEl.innerHTML = msg;
}

handleClick = function(event) {
    //Clear any messages
    setMessage("");
    var col = event.target;
    var row;
    console.log("col: " + col.id);  
    // Check column is not full
    if (board[0][col.id] === 0){
 console.log("adding disc now");       
        // Add disc to column
        var divEl = document.createElement("div");
        divEl.className = "disc";
        var selCol = document.getElementById(col.id);
        selCol.appendChild(divEl);

        //Loop through column to find the next available slot and mark the position with the currentPlayer
        for (let i=board.length-1; i>=0; i--){
            if(board[i][col.id] === 0) {
                board[i][col.id] = currentPlayer;
                row = i;
                break;
            }
        } 
console.log("board: " + JSON.stringify(board));
        if(currentPlayer === 1 ) {
            nextPlayer = 2;
        } else {
            nextPlayer = 1;
        }        

    } else {
        setMessage("No room in this column");
    }
}


// Gets an array of all the columns
var cols = document.getElementsByClassName("column");

// Iterates through each column to add an Event Listener
for(var i = 0; i < cols.length; i++) {
    cols[i].addEventListener('click', handleClick)
}

