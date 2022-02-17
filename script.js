// Grab all required elements from the DOM
const box = document.querySelector(".box");
const cells = document.getElementsByTagName("span");
const resetBtn = document.querySelector(".resetBtn");
const btn1 = document.querySelector("#btn1");
const btn2 = document.querySelector("#btn2");
const cellsLength = cells.length;


//Choose Player 1 value
btn1.addEventListener("click", function() {player_1.value = "x"; player_2.value = "o"})
btn2.addEventListener("click", function() {player_1.value = "o"; player_2.value = "x"})



// Define the Players object
var player_1 = {
    moved_cells: [],
    value: "",
    name: 'Player 1',
    move_pattern: /[13579]/
}

var player_2 = {
    moved_cells: [], 
    value: "",
    name: 'Player 2',
    move_pattern: /[2468]/
}

//Define the universe Object
var universe  = {
    move_no: 0,
    moves :  [],
    p1_val: player_1.value,
    p2_val: player_2.value,
    restartGame: function re_game(){
        for (var i in cells){cells[i].innerText = ""; cells[i].className = "blank";}
        val = ""; 
        player_1.value = "";
        player_2.value = "";
        universe.move_no = 0;
        universe.moves = [];
        player_1.moved_cells = [];
        player_2.moved_cells = [];
    },

};

// Player move engine
var val;
for(let i = 0; i < cellsLength; i++ ){
    const cell = cells[i]

    // Reflect the number of moves and specific move number in the universe object when a cell is clicked
    cell.addEventListener("click",
        function() {
            universe.move_no ++;
            universe.moves.push(i);

            // Simplify a long expression to a variable
            var x = universe.move_no;

            // Check the move no to determine if x or o
            if (x % 2 != 0){
                val = player_1.value;
                cell.innerText = val;

                // Double-click and double- value fix 
                if (cell.innerText = val) {
                    cell.setAttribute("class", "filled");
                    player_1.moved_cells.push(i)
                    // Check if a player has fulfilled the winning cell sequence
                    verifyWin(player_1)
                }
            }

            else if(x % 2 == 0){
                val = player_2.value;
                cell.innerText = val;
                
                // Double-click and double- value fix 
                if (cell.innerText = val) {
                    cell.setAttribute("class", "filled");
                    player_2.moved_cells.push(i);
                    // Check if a player has fulfilled the winning cell sequence
                    verifyWin(player_2)
                }
            }
        }
    )
}

//Restart Game button function
resetBtn.addEventListener('click', universe.restartGame)


function verifyWin(player) {
    a = player.moved_cells.sort()

    p1 = a.map(function(a,b,c) {
        return a-c[b-1]; 
    })

    p1.splice(0, 1)

    if (p1[0] && (p1[0] === p1[1])) {
        alert(`${player.name} won`);
        universe.restartGame
    }
}

