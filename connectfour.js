var currentPlayer = 1;
var nextPlayer = 2;
var color = "red";
var gameOver = false;

var board = [
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

// Gets an array of all the columns
var cols = document.getElementsByClassName("column");


function setMessage(msg){
    var msgEl = document.getElementById("message"); 
    msgEl.innerHTML = msg;
}

// Check for 4-in-a-row
function checkWinner(arr) {
    var result = false;
    // HORIZONTAL
// iterate each row
for(let y = 0; y < arr.length; y++){

    // iterate each cell in the row
    for(let x = 0; x < edgeX; x++) {
      let cell = arr[y][x];
      
      // Only check if cell is filled
      if(cell !== 0) {
        
        // Check the next two cells for the same value
        if(cell === arr[y][x+1] && cell === arr[y][x+2] && cell === arr[y][x+3] ) {
          console.log("4 in a row horizontal found at " + (x+1) + ":" + (y+1) + "Player " + cell + " wins!");
          setMessage("4 IN A ROW found horizontally at column " + (x+1) + ", row " + (y+1) + "<br> Player " + cell + " wins!");
          result = true;
        }
      }
    }
  }
  
  // VERTICAL
  // iterate each row   
  for(let y = 0; y < edgeY; y++){
  
    // iterate each cell in the row
    for(let x = 0; x < arr[0].length; x++) {
      cell = arr[y][x];
      
      // Only check if cell is filled
      if(cell !== 0) {
        
        // Check the next two cells for the same value
        if(cell === arr[y+1][x] && cell === arr[y+2][x] && cell === arr[y+3][x]) {
          console.log("4 in a row horizontal found at " + (x+1) + ":" + (y+1) + "Player " + cell + " wins!")
          setMessage("4 IN A ROW found vertically at column " + (x+1) + ", row " + (y+1) + "<br>Player " + cell + " wins!");
          result = true;
        }
      }
    }
  }
  
  // DIAGONAL (DOWN RIGHT)
  // iterate each row   
  for(let y = 0; y < edgeY; y++){
  
    // iterate each cell in the row
    for(let x = 0; x < edgeX; x++) {
      cell = arr[y][x];
      
      // Only check if cell is filled
      if(cell !== 0) {
        
        // Check the next two cells for the same value
        if(cell === arr[y+1][x+1] && cell === arr[y+2][x+2] && cell === arr[y+3][x+3]) {
          console.log("4 in a row down-right found at " + (x+1) + ":" + (y+1) + "Player " + cell + " wins!")
          setMessage("4 IN A ROW found diagonally down-right at column " + (x+1) + ", row " + (y+1) + "<br>Player " + cell + " wins!");
          result = true;
        }
      }
    }
  }
  
  
  // DIAGONAL (DOWN LEFT)
  // iterate each row   
  for(let y = 3; y < arr.length; y++){
  
    // iterate each cell in the row
    for(let x = 0; x < edgeX; x++) {
      cell = arr[y][x];
      
      // Only check if cell is filled
      if(cell !== 0) {
        
        // Check the next two cells for the same value
        if(cell === arr[y-1][x+1] && cell === arr[y-2][x+2] && cell === arr[y-3][x+3]) {
          console.log("4 in a row down-left found at " + (x+1) + ":" + (y+1) + "Player " + cell + " wins!");
          setMessage("4 IN A ROW found diagonally down-left at column " + (x+1) + ", row " + (y+1) + "<br>Player " + cell + " wins!");
          result = true;
        }
      }
    }
  }
    
    return result;
}

// Check for draw by seeing if all slots are taken 
function checkDraw(arr) {
    var result = true;
    for (x=0; x<arr[0].length; x++) {
        if (arr[0][x] === 0){
            result = false;
        } else {
            continue;
        }
    }

    return result;
} 


// Reset the board by re-initializing all slots and remove the discs
function resetGame() {
    setMessage("");
    currentPlayer = 1;
    nextPlayer = 2;
    color = "red";
    gameOver = false;

    board = [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0]
    ]
    
    for(var i = 0; i < cols.length; i++) {
        var discToRemove = document.getElementById(i).getElementsByClassName("disc");
        for(var j = discToRemove.length-1; j >= 0; j--) {
            var childDisc = discToRemove[j];
            childDisc.parentNode.removeChild(childDisc);
        }
    }
}


handleClick = function(event) {

    if (!gameOver) {
        //Clear any messages
        setMessage("");
    
        var col = event.target;
        var row;
        console.log("col: " + col.id);  
        // Check column is not full
        if (board[0][col.id] === 0){     
            // Add disc to column
            var divEl = document.createElement("div");
            divEl.className = "disc";
            divEl.style.background = color;
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
                color = "black";
            } else {
                nextPlayer = 1;
                color = "red";
            }     
        
            if(checkWinner(board)) {
                gameOver = true;
            } else if(checkDraw(board)) {
            setMessage("Draw! Game Over");
                gameOver = true;
            // resetGame();
            } else { 
                // Swap players
                currentPlayer = nextPlayer;
            }

        

        } else {
            setMessage("No slots available in this column");
        }
    }
}

// Iterates through each column to add an Event Listener
for(var i = 0; i < cols.length; i++) {
    cols[i].addEventListener('click', handleClick)
}
