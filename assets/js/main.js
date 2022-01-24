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

function dragStart() {
    draggedTileColor = this.style.backgroundColor;
    idOfDraggedTile = parseInt(this.id);
    console.log(draggedTileColor, this.id, 'picked up');
}

function onDrop() {
    replacedTileColor = this.style.backgroundColor;
    idOfReplacedTile = parseInt(this.id);
    this.style.backgroundColor = draggedTileColor;
    tiles[idOfDraggedTile].style.backgroundColor = replacedTileColor;
    console.log(replacedTileColor, this.id, 'droped');
}

})