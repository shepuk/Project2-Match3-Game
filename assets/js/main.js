document.addEventListener('DOMContentLoaded', () => {

    const grid = document.querySelector('.game-area');
    const playAreaHeight = 9;
    const playAreaWidth = 9;
    const tiles = []; //array to hold created tile/div elements

    const tileColors = [  //colours generated at coolors.co
        '#7B7554',
        '#17183B',
        '#A11692',
        '#FF4F79',
        '#FFB49A',
        '#D36060'
    ]

    /**
     * Creates a 9x9 set of divs (game tiles), assigns each a random colour, 
     * a uniqie ID and appends as a child to the main game area div
     */
    function createBoard() {
        for (let i = 0; i < playAreaHeight * playAreaWidth; i++) { //Looping through our 9x9 game board
            const tile = document.createElement(`div`); //Creating a game board tile, already sized in CSS - should make things easily scalable
            tile.classList.add('tile');
            tile.setAttribute('draggable', true); //Will allow mouse controls - Researched at https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute
            let randomColor = Math.floor(Math.random() * tileColors.length); //Random number (0-1) * 5, Mathfloor rounds down to integer. Used to assign colours to tiles
            tile.setAttribute('id', i); //Give each tile an ID - may by handy to refer to this later
            tile.style.backgroundColor = tileColors[randomColor]; //Assigns a random colour from the squareColors array to the newly created div
            $('.game-area').append(tile); //jQuery adding the 'tile' to the dom
            //grid.appendChild(tile); //adding the 'tile' to the dom
            tiles.push(tile); //adding our newly created tile to the array
        };
    }

createBoard();

tiles.forEach(tile => tile.addEventListener('dragstart', dragStart));
tiles.forEach(tile => tile.addEventListener('drop', onDrop));

let draggedTileColor; //variable to store the colour value of picked up tile
let replacedTileColor; //variable to store the colour value of the tile which is replaced
let idOfDraggedTile; //variable to store the id number of a picked up tile
let idOfReplacedTile; //variable to store the id number of tile which is replaced

//The two below preventDefault functions allow the drop event to be triggered in chrome
//Fix from https://stackoverflow.com/questions/21339924/drop-event-not-firing-in-chrome
$('.tile').on('dragenter',function(event){
    event.preventDefault();
})
$('.tile').on('dragover',function(event){
    event.preventDefault();
})

/**
 * logs the colour and id of a picked up tile
 */
function dragStart() {
    draggedTileColor = this.style.backgroundColor;
    idOfDraggedTile = parseInt(this.id);
    console.log(this.id, 'picked up');
}

/**
 * logs the colour and id of the tile to be replaced
 * switches the colours of the dragged and replaced tiles
 */
function onDrop() {
    replacedTileColor = this.style.backgroundColor;
    idOfReplacedTile = parseInt(this.id);
    this.style.backgroundColor = draggedTileColor;
    tiles[idOfDraggedTile].style.backgroundColor = replacedTileColor;
    console.log(this.id, 'droped');
}

let adjacentTiles = [
    idOfDraggedTile -playAreaWidth, // up (using playAreaWidth variable allows functionality to change board size instead of using intergers)
    idOfDraggedTile +playAreaWidth, // down
    idOfDraggedTile -1, //left
    idOfDraggedTile +1 //right
]

})


//TODO!

//CURRENT DESIRED FEATURE LIST
//Detect valid moves (up, down, left, right)
//Allow movement only with valid moves
//Detect tiles of same colour as a sucessful move
//non-sucessful moves should revert tiles back
//spawn game board with at least a handful of moveable tiles as to not game over immidiately
//spawn game board without any sucessful moves at the start
//animate feedback - notify players of moves and non-valid moves etc.
//Animate tiles - both swapping tiles and hovering over tiles (possibly achieve this with jQuery)
//menu to start game and show controls
//contact page using email API

//EXTRAS IF TIME ALLOWS
//high scores
//incorporate timer and / or score
//images on tiles for a better overall look
//allow player to change game board size